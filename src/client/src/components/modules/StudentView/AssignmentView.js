import PropTypes from "prop-types";
import axios from "axios";
import { ReactComponent as SvgPlus } from "../../../svgs/Plus.svg";
import { ReactComponent as SvgDocument } from "../../../svgs/document_icon.svg";
import { ReactComponent as SvgRedX1 } from "../../../svgs/redX.svg";
import { ReactComponent as SvgRedX } from "../../../svgs/redX.svg";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import banner from "../../../svgs/simple-blue.jpg";

import {
  createAssignment,
  createAssignmentSuccesful,
  afterCreateAssignment,
} from "../../../actions/assignmentAction";

export const AssignmentStudent = ({
  assignment,
  assignments,
  ind,
  user,
  module,
  history,
  assignmentCreated,
  createAssignment,
  createAssignmentSuccesful,
  afterCreateAssignment,
}) => {
  const [assignmentEdit, setAssignmentEdit] = useState({
    id: "",
    userid: user ? user.id : "",
    submitted_document: "",
    moduleId: module ? module._id : "",
    name: assignment ? assignment : "",
    submitted_document_file: "",
  });

  const { id, userid, name, submitted_document, submitted_document_file } =
    assignmentEdit;

  const [url, setUrl] = useState({
    url: "",
    type: "",
  });

  useEffect(() => {
    if (assignmentCreated) {
      afterCreateAssignment();
    }
  }, [assignmentCreated]);

  useEffect(() => {
    getAssignmentName();
  }, []);

  function handleNewAssignment(event) {
    setAssignmentEdit((prevState) => ({
      ...assignmentEdit,
      submitted_document_file: event.target.files[0],
      submitted_document: event.target.files[0],

    }));
    
    setUrl({url: URL.createObjectURL(event.target.files[0]), type: event.target.files[0].type});
    console.log(URL.createObjectURL(event.target.files[0]), event.target.files[0].type)

  }

  function handleClick(event) {
    setAssignmentEdit((prevState) => ({
      ...assignmentEdit,
      submitted_document_file: "",
      submitted_document: "",
    }));

    setUrl({url: '', type: ''})
  }

  const onSubmitStud = async (e) => {
    e.preventDefault();

    if (id === "") {
      let aId = "";
      await Promise.all([
        new Promise((resolve, reject) => {
          axios
            .post("http://localhost:3001/assignment/create", assignmentEdit)
            .then((res) => {
              aId = res.data._id;
              const url = `http://localhost:3001/assignment/submitted/${aId}`;

              let documentsFormData = new FormData();
              documentsFormData.append("SubmittedDocument", submitted_document);

              const formData = documentsFormData;

              const config = {
                headers: { "content-type": "multipart/form-data" },
              };

              axios
                .post(url, formData, config)
                .then((response) => {
                  resolve();
                })
                .catch((error) => {
                  resolve();
                  console.log(error);
                });
              resolve();
            })
            .catch((e) => {
              console.log(e);
              resolve();
              history.push("/module");
            });
        }),
      ]);
    } else {
      await Promise.all([
        new Promise((resolve, reject) => {
          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...assignmentEdit,
            }),
          };

          fetch(`http://localhost:3001/assignment/edit/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              //console.log("DATA handled",data)
              resolve();
            });
        }),

        new Promise((resolve, reject) => {
          const url = `http://localhost:3001/assignment/submitted/${id}`;

          let documentsFormData = new FormData();
          documentsFormData.append("SubmittedDocument", submitted_document);

          const formData = documentsFormData;

          const config = {
            headers: { "content-type": "multipart/form-data" },
          };

          axios
            .post(url, formData, config)
            .then((response) => {
              resolve();
            })
            .catch((error) => {
              resolve();
              console.log(error);
            });
          resolve();
        }),
      ]);
    }

    createAssignmentSuccesful();
    history.push("/module");
  };

  function getDocumentURL3(docName) {
    return `http://localhost:3001/getAssignment/${docName}`;
  }

  function getAssignmentName() {
    if (Array.isArray(assignments)) {
      assignments.map((as) => {
        if (as.userid === userid && as.name === name) {
          setAssignmentEdit({
            ...assignmentEdit,
            id: as._id,
            submitted_document: as.submitted_document,
          });
        }
      });
    }
  }

  function getAssignment() {
    var a;
    if (Array.isArray(assignments)) {
      assignments.map((as) => {
        if (as.userid === userid && as.name === name) {
          if (as.mark !== "" && as.mark !== undefined && as.mark !== null) {
            a = as;
          }
        }
      });
    }
    return a;
  }

  function getAssignURL(doc) {
    return URL.createObjectURL(doc);
  }

  return (
    <div className="d-block">
      <div className="card">
        <div className="card-body">
          <h2>
            {assignment && user
              ? assignment.substr(0, assignment.indexOf("*")) +
                " - " +
                user.name
              : ""}
          </h2>

          <div className="document_list">
            <div className="document_single">
              <SvgDocument className="little-icon" />
              <a href={getDocumentURL3(assignment)} target="_blank">
                {getDocumentURL3(assignment).split("/").reverse()[0].length > 5
                  ? getDocumentURL3(assignment)
                      .split("/")
                      .reverse()[0]
                      .slice(0, 5) + "..."
                  : getDocumentURL3(assignment).split("/").reverse()[0]}
              </a>
            </div>

            {submitted_document_file && submitted_document_file !== "" ? (
              <>
                <div className="document_list">
                  <div className="document_single">
                    <SvgDocument className="little-icon" />
                    <a
                      href={getAssignURL(submitted_document_file)}
                      target="_blank"
                    >
                      {getAssignURL(submitted_document_file)
                        .split("/")
                        .reverse()[0].length > 5
                        ? getAssignURL(submitted_document_file)
                            .split("/")
                            .reverse()[0]
                            .slice(0, 5) + "..."
                        : getAssignURL(submitted_document_file)
                            .split("/")
                            .reverse()[0]}
                    </a>
                    <SvgRedX1
                      className="little-icon3"
                      onClick={handleClick}
                      ind={ind}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {submitted_document ? (
                  <>
                    <div className="document_list">
                      <div className="document_single">
                        <SvgDocument className="little-icon" />
                        <a
                          href={getDocumentURL3(submitted_document)}
                          target="_blank"
                        >
                          {getDocumentURL3(submitted_document).split("*")[0]
                            .length > 5
                            ? getDocumentURL3(submitted_document)
                                .split("/")
                                .reverse()[0]
                                .slice(0, 5) + "..."
                            : getDocumentURL3(submitted_document)
                                .split("/")
                                .reverse()[0]}
                        </a>
                        <SvgRedX
                          className="little-icon4"
                          onClick={handleClick}
                          ind={ind}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </>
            )}
            <div class="image-upload">
              <label for={`file-input ${ind}`}>
                <SvgPlus className="little-icon plus" />
              </label>

              <input
                id={`file-input ${ind}`}
                key={ind}
                type="file"
                onChange={handleNewAssignment}
              />
            </div>
          </div>

          {getAssignment() ? (
            <div>
              <hr></hr>
              <p>Mark: {getAssignment().mark}</p>
              <p>
                Comments:{" "}
                {getAssignment().comments ? getAssignment().comments : ""}
              </p>

              {getAssignment().marked_document != "" ? (
                <div className="document_single">
                  <SvgDocument className="little-icon" />
                  <a
                    href={getDocumentURL3(getAssignment().marked_document)}
                    target="_blank"
                  >
                    {getDocumentURL3(getAssignment().marked_document)
                      .split("/")
                      .reverse()[0].length > 5
                      ? getDocumentURL3(getAssignment().marked_document)
                          .split("/")
                          .reverse()[0]
                          .slice(0, 5) + "..."
                      : getDocumentURL3(getAssignment().marked_document)
                          .split("/")
                          .reverse()[0]}
                  </a>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {url.url ? 
            <div className="d-flex flex-column justify-content-center mt-2">
              {url.type.split('/')[0] == 'image' ? <img className="img-thumbnail" src={url.url}></img> : 
              <>
              <Document className="d-flex justify-content-center" file={assignmentEdit.submitted_document}>
                <Page pageNumber={1}></Page>
              </Document>
              </>
              }             
            </div>  
            : <h1></h1>}
          

          <div className="d-flex justify-content-center mt-2">
            <form onSubmit={onSubmitStud}>
              <button type="submit" className="btn btn-success">
                Submit Assignment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AssignmentStudent.propTypes = {
  /**
   * This represents the URL of the document that will be seen
   */
};

const mapStateToProps = (state) => ({
  assignmentCreated: state.assignment.assignmentCreated,
});

export default connect(mapStateToProps, {
  createAssignment,
  createAssignmentSuccesful,
  afterCreateAssignment,
})(AssignmentStudent);
