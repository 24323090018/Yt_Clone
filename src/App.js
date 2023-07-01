import React, { Children, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import HomeScreen from './screens/homeScreen/HomeScreen'
import LoginScreen from './screens/loginScreen/LoginScreen.js'
import "./_app.scss"

import {BrowserRouter as Router,Route,Routes,Navigate, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import WatchScreen from './screens/WatchScreen.js/WatchScreen'
import SearchScreen from './screens/SearchScreen'
import SubscriptionsScreen from './screens/subscriptionsScreen/SubscriptionsScreen'
import ChannelScreen from './screens/channelScreen/ChannelScreen'



const Layout = ({children}) =>{

  const [sidebar,toggleSidebar] = useState(false);

  const handleToggleSidebar = ()=>toggleSidebar(value => !value);

  return (
    <>
              <Header handleToggleSidebar={handleToggleSidebar}/>
        
               <div className="app_container ">
              
                   <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar}/>
              
                   <Container fluid className="app__main ">
                      {children}
                   </Container>
                  
               </div>
    </>
  )
}


const App = () => {

// for login is compulsory /auth , /search redirect to auth page but ther is one problem if user referesh the page it forget it information means again login page  then use session and local stprage
  const {accessToken,loading} = useSelector(state=>state.auth)
  const history = useNavigate()
  useEffect(()=>{
    if(!loading && !accessToken){
      history('/auth')
    }
  },[accessToken,loading])


  return (

    // <Router>
      <Routes>

      { /*version 6 */}
      <Route exact path="/" element={<Layout> <HomeScreen /></Layout> } />
      <Route path='/auth' element={<LoginScreen/>}/>
      <Route path='/search/:query' element={<Layout> <SearchScreen/></Layout>}/>
      <Route path='/watch/:id' element={<Layout> <WatchScreen/> </Layout>}/>
      <Route path='/feed/subscriptions' element={<Layout> <SubscriptionsScreen/> </Layout>}/>
      <Route path='/channel/:channelId' element={<Layout> <ChannelScreen/> </Layout>}/>
      
      <Route path="*" element={<Navigate to="/" />} />

      {/* version 5  */}
        {/* <Route exact path='/' >
          <Layout>
            <HomeScreen />
          </Layout>
        </Route>

        <Route path='/auth'>

         <LoginScreen/> 
         </Route>
          
        

        <Route path='/search'>
          <Layout>
            <h1>
              Search Results
            </h1>
          </Layout>
        </Route> */}

        {/* <Route>
          <Redirect to='/'/>
        </Route> */}

      </Routes>
    // </Router>
  )
  
}

export default App
