'''
Writing views

A view function, or view for short, 
is a Python function that takes a web request and returns a web response. 

This response can be the HTML contents of a web page, 
or a redirect, or a 404 error, or an XML document, or an image . . . or anything, really. 

The view itself contains whatever arbitrary logic is necessary to return that response. 

This code can live anywhere you want, as long as it’s on your Python path. 

There’s no other requirement–no “magic,” so to speak. 

For the sake of putting the code somewhere, 
the convention is to put views in a file called views.py, 
placed in your project or application directory.
'''

import subprocess
import os
import codecs
import string
import random
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import SnapShot, Hash, Url
from .serializers import SnapShotSerializer, HashSerializer, UrlSerializer
from decouple import config

# Create your views here.

@api_view()
@permission_classes([AllowAny])
def hashurl(request):
    ''' This function archives the given URL '''

    query = request.query_params
    url = query['url']
    url = url.replace(" ", "+")

    if url[len(url) - 1] != '/':
        url = url + '/'

    command = "sudo docker run capsulecode/singlefile " + \
        url + " > ./api/templates/archived-pages/get-html.html"
    subprocess.run(command, shell=True, check=True)

    path = "./api/templates/archived-pages/"

    with codecs.open(path + "get-html.html", "r", "utf-8") as file:

        lines = file.readlines()
        lines[1] = ""
        lines[2] = ""
        lines[3] = ""

    with codecs.open(path + "get-html.html", "w", "utf-8") as file:

        for line in lines:
            file.write(line)

    hash_value = subprocess.run(["sha256sum", path + "get-html.html"],
                                capture_output=True, check=True).stdout.decode()
    hash_value = hash_value[:64]

    try:
        url_object = Url.objects.get(url=url)

        try:
            
            with codecs.open(path + "get-html.html", "r", "utf-8") as file:
                html = file.read()
            
            hash_object = Hash.objects.get(hash=hash_value, url=url_object)
            
            snapshot = SnapShot.objects.create(hash=hash_object, html=html)
            
            serializer = SnapShotSerializer(snapshot)
            
            response = {"hash": hash_value, "url": url, "code": url_object.code}
            response.update(serializer.data)
            
            all_hash = Hash.objects.filter(url__url = url)
            serializer2 = HashSerializer(all_hash, many= True)
            data2 = serializer2.data

            new_dict = [response, data2]   
            
            return Response(new_dict)

        except:
            
            with codecs.open(path + "get-html.html", "r", "utf-8") as file:
                html = file.read()
            
            hash_object = Hash.objects.create(hash=hash_value, url=url_object)
            snapshot = SnapShot.objects.create(hash=hash_object, html=html)
           
            new_file_name = hash_value + '.html'
            new_file_path = path + new_file_name
            os.rename(path + 'get-html.html', new_file_path)

            command = "aws s3 cp " + new_file_path + config("S3")
            subprocess.run(command, shell=True, check=True)
            
            serializer = SnapShotSerializer(snapshot)
            response = {"hash": hash_value, "url": url, "code": url_object.code}
            response.update(serializer.data)
            
            all_hash = Hash.objects.filter(url__url = url)
            serializer2 = HashSerializer(all_hash, many= True)
            data2 = serializer2.data
            
            new_dict = [response,data2] 
            
            return Response(new_dict)
            
    except:  
        
        new_file_name = hash_value + '.html'
        new_file_path = path + new_file_name
        os.rename(path + 'get-html.html', new_file_path)

        with codecs.open(path + hash_value + ".html", "r", "utf-8") as file:
            html = file.read()
        
        res = ''.join(random.choices(string.ascii_lowercase +
                             string.digits, k=7))
            
        while(True):
            try:
                
                Url.objects.get(code = res)
                
                res = ''.join(random.choices(string.ascii_lowercase +
                             string.digits, k=7))
                
            except:
                break
        
        url_object = Url.objects.create(url=url, code = res)
      
        hash_object = Hash.objects.create(hash=hash_value, url=url_object)
        
        SnapShot.objects.create(hash=hash_object, html=html)
       
        command = "aws s3 cp " + new_file_path + config("S3")
        subprocess.run(command, shell=True, check=True)
    
        serializer = UrlSerializer(instance=url_object)

        data = serializer.data
        
        response = {'hash': hash_value, 'url': url, "code": url_object.code}
        response.update(data['snapshots'][0]['content'][0])

        all_hash = Hash.objects.filter(url__url=url)
        serializer2 = HashSerializer(all_hash, many=True)
        data2 = serializer2.data
        
        new_dict = [response, data2]
      
        return Response(new_dict)

@api_view()
@permission_classes([AllowAny])
def showpage(request):
    ''' This function shows the archived page's info '''

    query = request.query_params
    query_hash = query['hash']
    code = query['code']
    message = "1"
    try:
        
        url_object = Url.objects.get(code = code)
        
        hash_object = Hash.objects.get(hash = query_hash, url = url_object)
        
    except:
        return Response({"message":"Page not archived with this hash!"})

    serializer = HashSerializer(hash_object)   
    data = serializer.data
    hash_url = {'hash': query_hash, 'url': url_object.url ,"code": url_object.code}

    hash_url.update(data['content'][len(data['content']) - 1])
    all_hash = Hash.objects.filter(url__url = url_object.url)
    serializer2 = HashSerializer(all_hash, many= True)
    data2 = serializer2.data


    # CheckPage

    command = "sudo docker run capsulecode/singlefile " + \
        url_object.url + " > ./api/templates/archived-pages/get-html.html"
    subprocess.run(command, shell=True, check=True)

    path = "./api/templates/archived-pages/"

    with codecs.open(path + "get-html.html", "r", "utf-8") as file:
        lines = file.readlines()
        lines[1] = ""
        lines[2] = ""
        lines[3] = ""

    with codecs.open(path + "get-html.html", "w", "utf-8") as file:
        for line in lines:
            file.write(line)

    hash_value = subprocess.run(["sha256sum", path + "get-html.html"],
                                capture_output=True, check=True).stdout.decode()
    hash_value = hash_value[:64]

    if hash_value == query_hash:
        message = "up-to-date"

    else:
        message = "Old!"

    # CheckPage


    new_dict = [hash_url,data2,message]
    return Response(new_dict)

@api_view()
@permission_classes([AllowAny])
def listpages(request):
    ''' This function lists arhived versions of given url. '''

    query = request.query_params
    url = query['url']

    url = url.replace(" ", "+")

    if url[len(url) - 1] != '/':
        url = url + '/'

    url_object = Url.objects.get(url=url)

    all_hash = Hash.objects.filter(url__url=url)
    serializer = HashSerializer(all_hash, many=True)
    
    data = {'code': url_object.code}
    response = [data,serializer.data]

    return Response(response)
