import React, { useEffect, useState } from 'react';
import { Grid } from 'react-loader-spinner';
import { useLocation, useSearchParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useGetSearchParams from '../../hooks/useGetSearchParams';
import '../../styles/pages/note/note.css';
import Username from '../Username';
import { colours } from '../utils/colours';
import useData from '../../hooks/useData';
import { PageLoading } from '../Loading';

const Note = () => {
  const searchTerm = useGetSearchParams('id');
  const { note, isLoadingNote, isFetchingNote, refetchNote } = useData(
    null,
    Number(searchTerm),
  );

  useEffect(() => {
    refetchNote();
  }, []);

  if (isLoadingNote || isFetchingNote)
    return <PageLoading colour={colours.tetiary} />;

  return (
    <div className="container-small">
      <div className="note">
        <div className="note-container">
          <div className="note-title-container">
            <h1 className="note-title">{note?.title}</h1>
            <div className="note-username-container">
              <img
                className="note-image"
                src={`https://storage.googleapis.com/tentynotes/${
                  note?.author && note?.author?.profile_image
                }`}
              />
              <Username
                username={note?.author?.username}
                userId={note?.author?.id}
                route="dashboard/profile"
                className="note-username"
              />
              <p className="note-date">{note?.created_at}</p>
            </div>
          </div>
          <div className="note-content-container">
            <p className="note-body">{note?.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
