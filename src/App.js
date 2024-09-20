import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  // Definir el estado para los valores del formulario
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    favoriteClass: ''
  });

  // Definir el estado para las validaciones
  const [validationStates, setValidationStates] = useState({
    emailState: true,
    passwordState: true
  });

  // Funciones para manejar los cambios en el formulario
  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
  };

  // Función de validación del email
  const isValidEmail = (email) => {
    const regex = /^(?=.*@)(?!.*@$).+/; // Contiene '@' y no termina en '@'
    return regex.test(email);
    
  };

  const handlePasswordChange = (e) => {
    setFormValues({ ...formValues, password: e.target.value });
    // Validar si la contraseña tiene más de 8 caracteres en tiempo real
    const hasMinLength = e.target.value.length >= 9; //verifica la longitud
    const hasLetter = /[a-zA-Z]/.test(e.target.value); // Verifica si hay letras
    const hasNumber = /\d/.test(e.target.value); // Verifica si hay números
    // Actualizar el estado de validación
    setValidationStates({
    ...validationStates,
    passwordState: hasMinLength && hasLetter && hasNumber
    });
  };

  const handleSelectChange = (e) => {
    setFormValues({ ...formValues, favoriteClass: e.target.value });
  };

  const clickSubmit = () => {
    //Call fetch
    alert(JSON.stringify(formValues))
    // Validar el correo electrónico solo cuando se haga clic en enviar
    const emailValid = isValidEmail(formValues.email);
    
    // Actualizar estado de validaciones
    setValidationStates({
      ...validationStates,
      emailState: emailValid
    });

    // Verificar si el email y la contraseña son válidos
    if (emailValid && validationStates.passwordState) {
      console.log('Formulario enviado:', formValues);
    } else {
      console.log('Errores en el formulario');
    }
  };

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>

      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
            value={formValues.email}
            isInvalid={!validationStates.emailState}
          />
          {!validationStates.emailState && (
            <Form.Text className="text-muted">
              Por favor, ingresa un email válido.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={formValues.password}
            isInvalid={!validationStates.passwordState}
          />
          {!validationStates.passwordState && (
            <Form.Text className="text-muted">
              Tu contraseña debe tener al menos 9 caracteres, numeros y letras.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologías web</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
