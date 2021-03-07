
export const  DeleteAnimal = ({ match })  => {

        fetch(`https://127.0.0.1:8000/api/animal/${match.params.id}`, { method: 'DELETE' })
            .then(() => this.setState({ status: 'Delete successful' }));
}

