import React from "react";
import pf from "petfinder-client";
// import Loadable from "react-loadable";
import { navigate } from "@reach/router";
import Carousel from "./Carousel";
import AdoptModalContent from "./AdoptModalContent";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

// const LoadableModalContent = Loadable({
//   loader: () => import("./AdoptModalContent"),
//   loading() {
//     return <p>Loading Modal...</p>;
//   }
// });

class Details extends React.Component {
  state = {
    loading: true,
    showModal: false
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  componentDidMount() {
    petfinder.pet
      .get({
        output: "full",
        id: this.props.id
      })
      .then(data => {
        const pet = data.petfinder.pet;
        let breed;

        if (Array.isArray(data.petfinder.pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }

        this.setState({
          name: pet.name,
          breed,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          loading: false
        });
      })
      .catch(() => {
        navigate("/");
      });
  }
  render() {
    if (this.state.loading) {
      return <h1>Current loading...</h1>;
    }

    const {
      name,
      animal,
      breed,
      location,
      description,
      media,
      showModal
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
          {showModal ? (
            <AdoptModalContent toggleModal={this.toggleModal} name={name} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Details;
