import React, { useState, useRef } from 'react';
import { ColorRing } from 'react-loader-spinner';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ArchivePage = () => {

   const element = <FontAwesomeIcon icon={faMagnifyingGlass} />
   let counter = 1;
   const [isLoading, setState] = useState([]);
   const [urlTitle, setTitle] = useState('');
   const [urlError, setUrlError] = useState('');
   const [example, setExample] = useState('');
   var url = useState('');
   const [posts, setPosts] = useState([]);

   const archivePage = async (urlTitle) => {

      url = "http://hashed-web-page-env.eba-m5uyrgib.us-west-2.elasticbeanstalk.com/hashurl?url=" + urlTitle;

      fetch(url)
         .then((response) => response.json())
         .then((response) => {

            setPosts(response);
            setState({ isLoading: true, Spinner: false })

            enableButton();

         }
         )
         .catch((err) => {

            setState({ isLoadingError: true })
            enableButton();

         });
   };

   const listPages = async (urlTitle) => {

      url = "http://hashed-web-page-env.eba-m5uyrgib.us-west-2.elasticbeanstalk.com/listpages?url=" + urlTitle;

      fetch(url)
         .then((response) => response.json())
         .then((response) => {
            setPosts(response);
            setState({ isLoadingListPages: true, Spinner: false })
            enableButton();

         }
         )
         .catch((err) => {
            setState({ isLoadingError: true })
            enableButton();

         });
   };

   const handleSubmit = (e) => {

      e.preventDefault();
      if (urlTitle === "") {
         setState({ isLoadingError: true });
      }
      else if (document.activeElement.name === "btnList") {
         listPages(urlTitle);
         setState({ Spinner: true });
         disableButton();
      }
      else if (document.activeElement.name === "btnArchive") {
         archivePage(urlTitle);
         setState({ Spinner: true });
         disableButton();
      }

   };

   const downloadTxtFile = (e) => {
      e.preventDefault();
      const element = document.createElement("a");
      const file = new Blob([posts[0].html]);
      element.href = URL.createObjectURL(file);
      element.download = posts[0].hash + ".html";
      element.click();
   };

   const buttonRefArchive = useRef();
   const buttonRefList = useRef();

   const disableButton = () => {
      buttonRefArchive.current.disabled = true;
      buttonRefList.current.disabled = true;
   }
   const enableButton = () => {
      buttonRefArchive.current.disabled = false;
      buttonRefList.current.disabled = false;
   }

   const validateUrl = (url) => {
      if (validator.isURL(url)) {
         setUrlError(null);
         enableButton();
      } else if (url === "") {
         setUrlError(null);
         enableButton();
      }
      else {
         setUrlError('Enter Valid Url!');
         setExample('Example: https://hashcrow.click/');
         disableButton();
      }
   }

   const twoCallsUrl = e => {
      setTitle(e.target.value);
      validateUrl(e.target.value);
   }

   return (

      <div>
         <main>
            <div className="logo">
               <a href="/"><img className="logo-img" src="hashcrow192.png" alt="crow" /></a>
               <a href="/"><p className="logo-text">Hashcrow</p></a>
            </div>
            <nav>

               <div className="navbar">
                  <a href="#">Contact</a>
                  <a href="#">About</a>
                  <a href="/">Home</a>
               </div>
            </nav>

            <div className="paragraph">
               <p className="paragraph1">Web content that is available today may
                  disappear tomorrow. Archive securely with Hashcrow now!</p>
            </div>

            <div className="form">
               <form onSubmit={handleSubmit}>

                  <input required type="text" placeholder="Archive or list snapshots..." aria-label="Search" value={urlTitle}
                     onChange={(e) => twoCallsUrl(e)} />
                  <div className='icon-container'>
                     <div className='icon'>
                        {
                           element
                        }
                     </div>
                  </div>

                  {
                     (urlError === null) ?

                        null

                        : <div>
                           <p className='urlError'>{urlError}</p>
                           <p className='urlErrorExample'>{example}</p>

                        </div>
                  }

                  <div className='form-button-container'>
                     <button name="btnArchive" ref={buttonRefArchive} type="submit">Archive</button>
                     <button name="btnList" ref={buttonRefList} type="submit">List</button>
                  </div>
               </form>
            </div>

            {
               (isLoading.isLoadingError) ?

                  <div className="container">
                     <p className='mt-5'></p>
                     <p className="lead"></p>
                     <h2>Error!</h2>
                  </div>

                  : null
            }

            {(isLoading.Spinner) ?

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
                     <header>
                        <h1>Archived Page Info</h1>
                     </header>
                     <div className='table-container'>
                        <table>
                           <tr>
                              <th>Permanent Link</th>
                              <td>{<a href={'/' + posts[0].hash + '/' + posts[0].code} >https://hashcrow.click/{posts[0].hash + '/' + posts[0].code}</a>}</td>
                           </tr>
                           <tr>
                              <th>Created Date</th>
                              <td>{posts[0].created_date}</td>
                           </tr>
                        </table>
                     </div>

                     <div className="button-container">

                        <div>

                           <a target='_blank' rel="noreferrer" href={posts[0].hash + '/raw'}><button className='button'>Show Raw</button></a>

                           <button className='button' onClick={downloadTxtFile}>Download</button>

                        </div>

                     </div>

                  </div>
                  : null

            }

            {

               (isLoading.isLoadingListPages && posts.message == null) ?

                  <div>

                     <h2>All Snapshots</h2>
                     <div className='table-container'>
                        <table className='all-version-table'>
                           {

                              posts[1].map((post) => {
                                 return (
                                    <div className="mt-5" key={post.code}>

                                       <div className="mt-5" key="second">

                                          <tr>
                                             <th>Version {counter++}</th>

                                          </tr>
                                          <tr>
                                             <td className="permanent-link-td">{<a href={post.hash + '/' + posts[0].code}>{'https://hashcrow.click/' + post.hash + '/' + posts[0].code}</a>}</td>
                                          </tr>
                                          <tr>

                                             <th>Created Date</th>
                                          </tr>
                                          {post['content'].map((post2) => {
                                             return (
                                                <tr>
                                                   <td className="created-date-td">{post2.created_date}</td>
                                                </tr>
                                             );
                                          })}

                                          <br></br>
                                          <br></br>

                                       </div>

                                    </div>
                                 );
                              })
                           }
                        </table>
                     </div>

                  </div>
                  : null

            }

            {
               (isLoading.isLoading && posts.message != null) ?

                  <div className="container">
                     <p className='mt-5'></p>
                     <p className="lead"></p>
                     <h2>{posts.message}</h2>
                  </div>

                  : null
            }

         </main>

      </div >
   );
};

export default ArchivePage;
