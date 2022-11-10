import AnimalItem from './AnimalItem';
import { mockAnimals_Client_1 } from '../../assets/mockData';
import { IAnimalList } from './types';
import { FC, useEffect, useState } from 'react';
import { getAnimals } from '../../utils/api';

const AnimalList: FC<IAnimalList> = ({ client_id }: IAnimalList) => {
  const [animals, setAnimals] = useState<any>([]);
  console.log(client_id);
  useEffect(() => {
    getAnimals(client_id)
      .then((data) => {
        console.log('ANIMALSe', data.data);
        setAnimals(data.data["animals"]);
      })
      .catch(() => console.log('error'));
  }, []);

  return (
    <>
      {animals &&
        animals.length > 0 &&
        animals.map(
          (animal: {
            animal_id: string;
            animal_age: string;
            animal_sex: string;
            animal_breed: string;
            animal_name: string;
            animal_type: string;
          }) => (
            <AnimalItem
              key={animal.animal_id}
              animal_id={animal.animal_id}
              animal_age={''}
              animal_sex={''}
              animal_breed={animal.animal_breed}
              animal_name={animal.animal_name}
              animal_type={animal.animal_type}
            />
          )
        )}
    </>
  );
};

export default AnimalList;
