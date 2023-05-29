import React, { useState, useEffect } from 'react';
import { BrowserRouter as Routes, useParams }
   from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import logo from "../hashcrow192.png";

const PageInfo = () => {

   const url_param = useParams();
   let counter = 1;
   const [isLoading, setState] = useState([]);
   var url = useState('');
   const [posts, setPosts] = useState([]);

   const pageInfo = async (url_param) => {

      url = "http://hashed-web-page-env.eba-m5uyrgib.us-west-2.elasticbeanstalk.com/showpage?hash=" + url_param.hash + "&code=" + url_param.code;

      fetch(url)
         .then((response) => response.json())
         .then((response) => {

            setPosts(response);
            setState({ isLoading: true, Spinner: false })

         }
         )
         .catch((err) => {
            setState({ isLoadingError: true })

         });
   };

   const downloadTxtFile = (e) => {
      e.preventDefault();
      const element = document.createElement("a");
      const file = new Blob([posts[0].html]);
      element.href = URL.createObjectURL(file);
      element.download = posts[0].hash + ".html";
      element.click();
   };

   return (

      <div>

         <main>
            {
               useEffect(
                  () => {
                     pageInfo(url_param);
                     setState({ Spinner: true })
                  }, []
               )
            }
            <div className="logo">
               <a href="/"><img className="logo-img" src={logo} alt="crow" /></a>
               <a href="/"><p className="logo-text">Hashcrow</p></a>
            </div>
            <nav>

               <div className="navbar">
                  <a href="#">Contact</a>
                  <a href="#">About</a>
                  <a href="/">Home</a>
               </div>
            </nav>

            {
               (isLoading.isLoadingError) ?
                  <div className="container">
                     <p className='mt-5'></p>
                     <p className="lead"></p>
                     <h2>Error!</h2>
                  </div>
                  : null
            }

            {

               (isLoading.Spinner) ?

                  <div className="spinner">

                     <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperclassName="blocks-wrapper"
                        colors={['green', 'green', 'green', 'green', 'green', /*'#f47e60', '#f8b26a', '#abbd81', '#849b87'*/]}
                     />
                  </div>

                  : null
            }

            {

               (isLoading.isLoading && posts.message == null) ?

                  <div>

                     <h2>Page Info</h2>

                     <div className='table-container'>
                        <table className='page-info-table'>
                           <tr>
                              <th>Version:</th><td>{posts[2]}</td>
                           </tr>
                           <tr>
                              <th>Url:</th><td><a href="{post.url}">{posts[0].url}</a></td>
                           </tr>
                           <tr>
                              <th>Permanent Link:</th><td>{<a href={'/' + posts[0].hash + '/' + posts[0].code} >http://hashcrow.click/{posts[0].hash + '/' + posts[0].code}</a>}</td>
                           </tr>
                           <tr>
                              <th>Created Date:</th><td>{posts[0].created_date}</td>
                           </tr>
                        </table>
                     </div>
                     <div className="button-container">

                        <div>
                           <a target='_blank' href={'/' + posts[0].hash + '/raw'}><button className='button'>Show Raw</button></a>
                           <button className='button' onClick={downloadTxtFile}>Download</button>

                        </div>

                     </div>

                     <h2>All Snapshots</h2>

                     <div className='table-container'>
                        <table className='all-version-table'>
                           {
                              posts[1].map((post) => {
                                 return (
                                    <div className="mt-5" key={post.hash}>
                                       <tr>
                                          <th>Version {counter++}</th>
                                       </tr>
                                       <tr>
                                          <td>{<a href={'/' + posts[0].hash + '/' + posts[0].code} >http://hashcrow.click/{posts[0].hash + '/' + posts[0].code}</a>}</td>
                                       </tr>
                                       <tr>
                                          <th>Created Date</th>
                                       </tr>
                                       {post['content'].map((post2) => {
                                          return (
                                             <tr>
                                                <td>{post2.created_date}</td>
                                             </tr>
                                          );
                                       })}

                                       <br></br>
                                       <br></br>
                                    </div>
                                 );
                              })}
                        </table>
                     </div>

                  </div>

                  : null

            }

            {
               (isLoading.isLoading && posts.message != null) ?

                  <main className="flex-shrink-0">
                     <div className="container">
                        <p className='mt-5'></p>
                        <h2>{posts.message}</h2>
                     </div>
                  </main>
                  : null
            }

            {
               (isLoading.rawpage) ?
                  <div>

                     <iframe style={{ width: "100%", height: "1000px" }} src={isLoading.rawPageHash} title="description"></iframe>
                  </div>
                  : null
            }
         </main>
      </div >
   );
};

export default PageInfo;