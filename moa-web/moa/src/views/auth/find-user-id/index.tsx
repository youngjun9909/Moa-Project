import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FindUserId from './FindUserId'
import FindUserIdResult from './FindUserIdResult';

function index() {
  return (
    <>
    <Routes>
    <Route path="/" element={<FindUserId />} />
    <Route path="/verify-find-userId" element={<FindUserIdResult />} />
    </Routes>  
    </>
  )
}

export default index;
