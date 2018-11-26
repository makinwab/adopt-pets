import React, { Dispatch, ChangeEvent } from "react";
import { ANIMALS } from "petfinder-client";
import { connect } from "react-redux";
import getBreeds from "./actionCreators/getBreeds";
import changeBreed from "./actionCreators/changeBreed";
import changeAnimal from "./actionCreators/changeAnimal";
import changeLocation from "./actionCreators/changeLocation";

interface Props {
  search: () => void;
  location: string;
  animal: string;
  handleLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAnimalChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  breed: string;
  handleBreedChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  breeds: string[];
}

class SearchBox extends React.Component<Props> {
  public handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.search();
  };

  public render() {
    return (
      <div className="search-params">
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="location">
            Location
            <input
              onChange={this.props.handleLocationChange}
              type="text"
              id="location"
              value={this.props.location}
              placeholder="location"
            />
          </label>

          <label htmlFor="animal">
            Animal
            <select
              id="animal"
              value={this.props.animal}
              onChange={this.props.handleAnimalChange}
              onBlur={this.props.handleAnimalChange}
            >
              <option />
              {ANIMALS.map(animal => (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="breed">
            Breed
            <select
              id="breed"
              value={this.props.breed}
              onChange={this.props.handleBreedChange}
              onBlur={this.props.handleBreedChange}
              disabled={this.props.breeds.length === 0}
            >
              <option />
              {this.props.breeds.map(breed => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </label>

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ breed, breeds, animal, location }: Props) => {
  return {
    breed,
    breeds,
    animal,
    location
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  handleAnimalChange(event: ChangeEvent<HTMLSelectElement>) {
    dispatch(changeAnimal(event.target.value));
    dispatch(getBreeds());
  },
  handleBreedChange(event: ChangeEvent<HTMLSelectElement>) {
    dispatch(changeBreed(event.target.value));
  },
  handleLocationChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(changeLocation(event.target.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
