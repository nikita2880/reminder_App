import React, { useState, useEffect } from 'react';
import AddList from "./listadd.js";
import fireDb from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const List = () => {
  
	var [currentId, setCurrentId] = useState('');
    var [reminder, setreminder] = useState({})

    const notify = () => toast("Event Removed!!");


    //Once components load complete
    useEffect(() => {
        fireDb.child('list').on('value', snapshot => {
            if (snapshot.val() != null) {
                setreminder({
                    ...snapshot.val()
                });
            }
        })
    }, [])


    const addOrEdit = (obj) => {
        if (currentId === '')
            fireDb.child('list').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
        else
            fireDb.child(`list/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
    }

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            notify();
            fireDb.child(`list/${id}`).remove(
                
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
        }
    }
 
  
  return (
        <>
            <div className="jumbotron bg-secondary jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center"><b>TO DO LIST</b></h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <h4 className="m-2 text-center">Set Your Reminder</h4>
                    <AddList {...({ currentId, reminder, addOrEdit })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thead-light">
                            <tr>
                                <th>Event name</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(reminder).map((key) => (
                                    <tr key={key}>
                                        <td>{reminder[key].eventname}</td>
                                        <td>{reminder[key].date}</td>
                                        <td>{reminder[key].desc}</td>
                                        <td className="bg-light">
                                            <a className="btn text-primary" onClick={() => { setCurrentId(key) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger" onClick={() => { onDelete(key) }}>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default List ;