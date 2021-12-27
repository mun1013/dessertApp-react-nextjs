import { Fragment } from "react";
import Image from 'next/image';
import classes from './about.module.css';

function About() {
  return (
    <Fragment>
      <header>
        <h1>ABOUT</h1>
      </header>
      <div className={classes.about}>
        <h2>Froggie and the Partner</h2>
        <p>Froggie is just like an ordinary person who is struggling in a decent adult working life after finishing his school and university.</p>
        <p>Despite having hectic work schedule, Froggie was trying to maintain a good diet and workout under the inspiration of the partner. Understand that there are physical needs when we are often stressed at work and the brain has an increased need for certain kinds of food, especially desserts!</p>
        <p>Just like what normal people do, Froggie and the partner head out for desserts like almost every month to satisfy their sweet tooth! Everyone do prefer eating sweet things but too much could put you in a bad health! Try to divert your attention to other foods might help, yeah. :D</p>
        <p>So, in a one fine day during this pandemic period, Froggie and the partner got some sources of inspiration from the internet and they couldn't wait to start making a light and creamy cheese cake. After a period of time, Froggie and the partner found a lot of joys through baking and would like to share with everyone around!</p>
        <p>To suit everybody's taste, Froggie and the partner strive hard to achieve a satisfying cheese cake recipe. Moving on, they bake some delicious cookies and definitely in love with it!</p>
        <p>The buttery taste and how smooth the chocolate feels in the mouth, everyone say that it was a best comfort food ever!</p>
        <p>Froggie and the partner only use premium and finest ingredients for all the goods! Including low sugar desserts that is definitely won't destroy your diet!</p>
        <p>Let's give your taste buds a burst of excitement by trying out our desserts here! Stay healthy and enjoy our desserts!</p>
      </div>
      <div className={classes.motto}>
        <h1>"Focus on quality. Give everyone quality."</h1>
      </div>
      <div className={classes.image}>
        <Image
          src='/images/frogvchick.png'
          alt="dessert"
          width={500}
          height={600}
        />
      </div>
    </Fragment>

  );
}

export default About;