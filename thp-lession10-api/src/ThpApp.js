import React, { useEffect, useState } from 'react';
import './App.css';
import ThpCategoryList from './components/ThpCategoryList';
import axios from './api/ThpApi';
import ThpCategoryForm from './components/ThpCategoryForm';

function ThpApp() {
  const [thpCategories, setThpCategories] = useState([]);

  const getCategories = async () => {
    try {
      const thpCateResponse = await axios.get("ThpCategory");
      setThpCategories(thpCateResponse.data);
    } catch (error) {
      console.log("lỗi: ", error);
    }
  }

  useEffect(() => {
    getCategories();
    console.log("thpCategories: ", thpCategories);
  }, [thpCategories]); 

  // Trạng thái form
  const [thpCategoryIsForm, setThpCategoryIsForm] = useState(false);

  const thpHandleAddNew = (param)=>{
    setThpCategoryIsForm(param);
  }
  const thpHandleCategoryCloseForm=(param)=>{
    setThpCategoryIsForm(param);
  }
  const thpHandleCategorySubmit=(param)=>{
    let id= thpCategories[thpCategories.length-1].thpId;
    console.log("Mã",id);
    param.thpId= id+1;
    thpCategories.push(param)
    setThpCategories((prev)=>{
      return[...prev];
    })
    setThpCategoryIsForm(false);

  }
  return (
    <div className="container border my-3">
      <h1>Trinh Huu Phuc - Call Api</h1>
      <ThpCategoryList renderThpCategories={thpCategories} 
                        onAddNew={thpHandleAddNew}/>
      <hr/>
      {
        thpCategoryIsForm===true?<ThpCategoryForm 
                                  onCloseForm={thpHandleCategoryCloseForm}
                                  onCategorySubmit={thpHandleCategorySubmit}
                                  />:""
      }
      
    </div>
  );
}

export default ThpApp;
