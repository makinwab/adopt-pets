import React from "react";
import pf, { Pet as PetType } from "petfinder-client";
import Pet from "./Pet";
import SearchBox from "./SearchBox";
import { connect } from "react-redux";
import { RouteComponentProps } from "@reach/router";

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("no API keys");
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

interface Props {
  location: string;
  animal: string;
  breed: string;
  path: string;
}

interface State {
  pets: PetType[];
}

class Results extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pets: [] as PetType[]
    };
  }

  public componentDidMount() {
    this.search();
  }

  public search = () => {
    petfinder.pet
      .find({
        output: "full",
        animal: this.props.animal,
        breed: this.props.breed,
        location: this.props.location
      })
      .then(data => {
        let pets: PetType[];

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({ pets });
      });
  };

  public render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />

        {this.state.pets.map(pet => {
          let breed = "" as string;

          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          }

          return (
            <Pet
              key={pet.id}
              id={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ location, breed, animal }: Props) => ({
  location,
  breed,
  animal
});

export default connect(mapStateToProps)(Results);
