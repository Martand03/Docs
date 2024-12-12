//import React from 'react'
import { useEffect, useRef, useState } from "react";
import Card from "./Card";


function ForeGround() {

  const ref = useRef(null);
  const [data, setData] = useState([]);
  const [showForm, setshowForm] = useState(false);
  const [formData, setformData] = useState({
    desc: "",
    filesize: "",
    tagTitle: "",
    tagColor: "",
  });


  // const data = [
  //   {
  //     desc: "Lorem ipsum dolor sit amet consectetur hola.",
  //     filesize: "0.9 mb",
  //     close: true,
  //     tag: {isOpen: true, tagTitle: "Download Now", tagColor: "green"}, 
  //   },
  //   {
  //     desc: "Lorem ipsum dolor sit amet consectetur hola.",
  //     filesize: "0.9 mb",
  //     close: true,
  //     tag: {isOpen: true, tagTitle: "Download Now", tagColor: "green"}, 
  //   },
  //   {
  //     desc: "Lorem ipsum dolor sit amet consectetur hola.",
  //     filesize: "0.9 mb",
  //     close: true,
  //     tag: {isOpen: true, tagTitle: "Download Now", tagColor: "blue"}, 
  //   },
  // ];

  // useState()

  useEffect(() => {
    const fetchData = async () =>{
      try{
        const response = await fetch("http://localhost:5000/api/cards");
        const result = await response.json();
        setData(result);
      } catch (error){
        console.error("Error fetching the data", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (field ,value) => {
    setformData((prev) =>({
      ...prev,
      [field]: value,    
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // prevent form from reloading the page

    const newCard = {
      desc: formData.desc,
      filesize: formData.filesize,
      close: false,
      tag:{
        isOpen: true,
        tagTitle: formData.tagTitle,
        tagColor: formData.tagColor
      },
    };

    // to post data to db
    try{
      const response = await fetch("http://localhost:5000/api/data",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });

      const result = await response.json();

      if(response.ok){
        setData((prevData) => [...prevData, result.data]);
        setformData({desc: "", filesize: "", tagTitle: "", tagColor: ""});
        setshowForm(false);
      }
      else{
        console.error(result.message || "Failed to add a new card.");
      }
    }
    catch (error){
      console.error("Error posting a new card data:", error);
    }

    // this makes only a state of a card
    // setData((prevData) => [...prevData, newCard]);
    // setshowForm(false);
    // setformData({desc: "", filesize: "", tagTitle: "", tagColor: ""}); // resets the form
  };

  // to delete a card
  const handleDelete = async(id) =>{
    try{
      const response = await fetch(`http://localhost:5000/api/cards/${id}`,{
        method: "DELETE",
      });

      if(response.ok){
        setData((prevData) => prevData.filter((card)=> card._id !== id));
      }
      else{
        console.error("Failed to delete a card.");
      }
    }catch(error){
      console.log("Failed to delete card details", error);
    }
  };

  return (
    <div ref={ref} className="absolute top-0 left-0 z-[3] w-full h-full flex gap-5 flex-wrap p-5 overflow-auto">
        {data.map((item,index) => (
          <Card key={index} data={item} reference={ref} onDelete={handleDelete}/>
        ))}

        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10]">
            <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-w-md">
              <h3 className="text-xl font semi-bold mb-4">Add a New Card</h3>
              <form
                onSubmit={(e) => handleFormSubmit(e)}
                className="flex flex-col gap-3"
              >
                <input
                  type="text"
                  placeholder="Description"
                  value={formData.desc}
                  onChange={(e) => handleInputChange("desc", e.target.value)}
                  className="border p-2 rounded"
                  required
                />

                <input
                  type="text"
                  placeholder="Input file size in mb"
                  value={formData.filesize}
                  onChange={(e) => handleInputChange("filesize", e.target.value)}
                  className="border p-2 rounded"
                  required
                />

                <input
                  type="text"
                  placeholder="Tag Title"
                  value={formData.tagTitle}
                  onChange={(e) => handleInputChange("tagTitle", e.target.value)}
                  className="border p-2 rounded"
                  required
                />

                <input
                  type="text"
                  placeholder="Tag Color eg. green or blue"
                  value={formData.tagColor}
                  onChange={(e) => handleInputChange("tagColor", e.target.value)}
                  className="border p-2 rounded"
                  required
                />

                <div className="flex justify-between mt-3">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Add Card
                  </button>
                  <button
                    type="button"
                    onClick={()=> setshowForm(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>

                </div>
              </form>
            </div>
          </div>
        )}

        <button 
         onClick={() => setshowForm(true)}
         className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 items-center justify-center shadow-lg text-2xl">
          +
        </button>
    </div>
  );
};

export default ForeGround;