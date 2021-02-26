import React from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';



class Login extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        this.props.doLogin(username, password);
    }

    render() {
        return (
            <Container maxWidth="xs">
                <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Box component="div" display="inline" color="primary">{this.props.tryStatus}</Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField label="Username" id="username" variant="outlined" autoComplete="off" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Password" id="password" type="password" variant="outlined" autoComplete="off" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="secondary" type="submit" variant="outlined">
                                Log in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }

}
export default Login;
