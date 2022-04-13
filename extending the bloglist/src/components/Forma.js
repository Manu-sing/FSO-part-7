import { useState } from "react";
import "./form.css";
import { Form, Button } from "react-bootstrap";

const Forma = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLikes, setNewLikes] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleAuthor = (e) => {
    setNewAuthor(e.target.value);
  };

  const handleUrl = (e) => {
    setNewUrl(e.target.value);
  };

  const handleLikes = (e) => {
    setNewLikes(e.target.value);
  };

  const handleStatus = (e) => {
    setNewStatus(e.target.value);
  };

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
      status: newStatus,
    });
    resetForm();
  };

  const resetForm = () => {
    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
    setNewLikes("");
    setNewStatus("");
  };

  return (
    <div className="container">
      <div className="form-title">
        <h2>Here you can add a new article to the list:</h2>
      </div>
      <div>
        <Form onSubmit={addBlog}>
          <Form.Group>
            <Form.Label>TITLE</Form.Label>
            <Form.Control
              id="title"
              title="title"
              value={newTitle}
              onChange={handleTitle}
            />
            <Form.Label>AUTHOR</Form.Label>
            <Form.Control
              id="author"
              value={newAuthor}
              onChange={handleAuthor}
            />
            <Form.Label>LINK</Form.Label>
            <Form.Control id="url" value={newUrl} onChange={handleUrl} />
            <Form.Label>LIKES</Form.Label>
            <Form.Control id="likes" value={newLikes} onChange={handleLikes} />
            <Form.Label>STATUS</Form.Label>
            <Form.Select value={newStatus} onChange={handleStatus}>
              <option value data-isdefault="true">
                -- Select --
              </option>
              <option value="Read">Read</option>
              <option value="Non Read">Non Read</option>
            </Form.Select>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Forma;
