import sandwich from '../../public/sandwich.png';
import sandwich2 from '../../public/sandwich2.png';
import sandwich3 from '../../public/sandwich3.png';
import lunch1 from '../../public/lunch1.png';
import lunch2 from '../../public/lunch2.png';
import lunch3 from '../../public/lunch3.png';
import dessert1 from '../../public/dessert1.png';
import dessert2 from '../../public/dessert2.png';
import dessert3 from '../../public/dessert3.png';
import smoothie1 from '../../public/smoothie1.png';
import smoothie2 from '../../public/smoothie2.png';
import smoothie3 from '../../public/smoothie3.png';


const items = {
  breakfast: [
    {
      image: sandwich,
      heading: 'Zöldséges szendvics',
      desc: 'teljes kiőrlésű kenyér, paradicsom, rukkola, kesus kenő',
      price: 1.5,
    },
    {
      image: sandwich2,
      heading: 'Paradicsomos szendvics',
      desc: 'teljes kiőrlésű kenyér, paradicsom, rukkola, kesus kenő',
      price: 1.6,
    },
    {
      image: sandwich3,
      heading: 'Kesus szendvics',
      desc: 'teljes kiőrlésű kenyér, paradicsom, rukkola, kesus kenő',
      price: 1.7,
    },
  ],
  lunch: [
    {
      image: lunch1,
      heading: 'Vegan Chili Cheese Fries',
      desc: 'chilli, cheese, fries',
      price: 2.5,
    },
    {
      image: lunch2,
      heading: 'Mushroom Sandwich',
      desc: 'mushroom, salad, bunny',
      price: 2.6,
    },
    {
      image: lunch3,
      heading: 'Veggie Bake',
      desc: 'eggplant, potato, tomato, veggie cheese',
      price: 2.7,
    },
  ],
  dessert: [
    {
      image: dessert1,
      heading: 'Blueberry Cheesecake',
      desc: 'blueberry, cheese, dough',
      price: 2,
    },
    {
      image: dessert2,
      heading: 'Coconut Balls',
      desc: 'coconut, cocoa, cashew, wheat',
      price: 2.1,
    },
    {
      image: dessert3,
      heading: 'Fruit Salad',
      desc: 'pineapple, almond, chocolate',
      price: 2.7,
    },
  ],
  smoothie: [
    {
      image: smoothie1,
      heading: 'Apple Smoothie',
      desc: 'apple, spirulina, spinach, orange, lemon',
      price: 1.5,
    },
    {
      image: smoothie2,
      heading: 'Blueberry Smoothie',
      desc: 'blueberry, banana, oatmilk',
      price: 1.6,
    },
    {
      image: smoothie3,
      heading: 'Banana Smoothie',
      desc: 'banana, coconut milk',
      price: 1.7,
    },
  ],
};

export default items;
