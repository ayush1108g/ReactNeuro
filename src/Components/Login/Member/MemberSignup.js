import Card from '../../UI/Card';
import classes from './MemberSignup.module.css'

const MemberSignUp = (props) => {


    return (
        <section className={classes.form}>
            <Card >
                <div className={classes['signup-form']}>
                    <h2>Sign Up</h2>
                    <form >
                        <input type="text" name="fullname" placeholder="Full Name" required></input>
                        <input type="email" name="email" placeholder="Email" required></input>
                        <input type="password" name="password" placeholder="Create-Password" required></input>
                        <input type="password" name="code" placeholder="Authentic-Member-Code" required></input>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className={classes.para}>
                    <p>Already have an account? <button className={classes.buttonSubmit} type='button' onClick={props.signInHandler}>Sign In</button></p>
                </div>
            </Card>
        </section>
    );
};

export default MemberSignUp;