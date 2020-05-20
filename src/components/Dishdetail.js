import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState(() => ({
      isModalOpen: !this.state.isModalOpen
    }));
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
  };

  render() {
    return (
      <>
        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>

          <ModalHeader>Login</ModalHeader>

          <ModalBody>

            <LocalForm onSubmit={(values) => this.handleSubmit(values)} className="container">

              <div className="form-group" >

                <Row>
                  <Label htmlFor="rating">Your Feedback</Label>
                </Row>

                <Row>
                  <Control.select
                    model=".rating" id="rating" name="rating" className="form-control"
                    defaultValue="1"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </Row>
              </div>

              <div className="form-group">
                <Row>
                  <Label htmlFor="author" >Your Name</Label>
                </Row>
                <Row>
                  <Control.text model=".author" id="author" name="author"
                    placeholder="Name"
                    className="form-control"
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Row>
              </div>

              <div className="form-group" >

                <Row>
                  <Label htmlFor="comment">Your Feedback</Label>
                </Row>

                <Row>
                  <Control.textarea
                    model=".comment" id="comment" name="comment"
                    rows="6" className="form-control"
                  />
                </Row>
              </div>

              <Row className="form-group" >
                <Col md={{ size: 10 }}>
                  <Button type="submit" color="primary">Submit</Button>
                </Col>
              </Row>

            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}



const RenderDish = ({ dish }) => {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{baseUrl + dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  )
};


const RenderComments = ({ comments, addComment, dishId }) => {
  const comment = comments.map((comment) => {
    return (
      <li key={comment.id}>
        <p>{comment.comment}</p>
        <p> --{comment.author}, {new Intl.DateTimeFormat('en-us', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
      </li>
    )
  }
  );

  if (comments.length > 0) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comment}
        </ul>
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    )
  }
};

const Dishdetail = ({ dish, comments, addComment, isLoading, errMess }) => {
  if (isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{errMess}</h4>
        </div>
      </div>
    );
  }
  else {
    return (

      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12"><h3>{dish.name}</h3></div>
        </div>
        <div className="row">
          <RenderDish dish={dish} />
          <RenderComments
            comments={comments}
            addComment={addComment}
            dishId={dish.id}
          />
        </div>
      </div>
    );
  }
}

export default Dishdetail;