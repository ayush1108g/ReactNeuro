import Card from '../../UI/Card'
import classes from './MemberSignin.module.css'

const MemberSignIn = (props) => {


    return (
        <section className={classes.form}>
            <Card >
                <div className={classes['signin-form']}>
                    <h2>Sign In</h2>
                    <br></br>
                    <br></br>
                    <br></br>
                    <form >
                        <input type="email" name="email" placeholder="Email" required></input>
                        <input type="password" name="password" placeholder="Create-Password" required></input>
                        <input type="password" name="code" placeholder="Authentic-Member-Code" required></input>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
                <div className={classes.para}>
                    <p>Don't have an account? <button className={classes.buttonSubmit} type='button' onClick={props.signUpHandler}>Sign Up</button></p>
                </div>
            </Card>
        </section>
    );
};

export default MemberSignIn;