import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError,setHttpError] = useState()
  
  
  useEffect(() => {
     const loadedMeals = []
     fetch("https://react-http-d6113-default-rtdb.firebaseio.com/meals.json").then(async(response) => {
       if (!response.ok) {
         throw new Error('Something went wrong!')
       }
       return response.json()
      }).then((data) => {
        for (const key in data) {
          loadedMeals.push({ id: key, ...data[key] });
        }
        setMeals(loadedMeals)
        setIsLoading(false)
      }).catch((error)=> {
        setIsLoading(false);
        setHttpError(error.message)
      })
 
  }, []);
  
  if (isLoading) {
    return <section className={classes.MealsLoading}>Loading...</section>;
  }
  if (httpError) {
    return <section className={classes.MealsError}>
      <p>{ httpError}</p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
