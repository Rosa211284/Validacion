<?php
        $servername  ="localhost";
        $username    ="root";
        $password    ="";
        $dbname      ="validacion";

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }

        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $fnombre = mysqli_real_escape_string($conn, $_POST['fnombre']);
            $fapellidos = mysqli_real_escape_string($conn, $_POST['fapellidos']);
            
            $encryption_key = "clave secreta";
            $sql = "INSERT INTO usuarios (nombre,apellidos) VALUES (
    
            AES_ENCRYPT('nombre','encryption_key'),
            AES_ENCRYPT('apellidos','encryption_key'))";

            if ($conn->query($sql) === TRUE) {
                echo "Los datos se guardaron correctamente.";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

        }

            $conn->close();
?>
<br>
<form action ="index.php" method="POST">
        Nombre: <input type="text" name="fnombre" required><br>
        Apellidos: <input type="text" name="fapellidos" required><br>

        <input type="submit"  value="guardar Datos">


        <style>
            
body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url("../IMG/adan.jpg");
    
background-size: cover;
background-repeat: no-repeat;
background-position: center;
}

h2 {
    text-align: center;
    color: #333;
}


.form-container {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
}


.form-element {
    margin-bottom: 20px;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
    color: #555;
}

input[type="text"], input[type="email"], input[type="password"] {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    background-color: #fafafa;
}

input[type="text"]:focus, input[type="email"]:focus, input[type="password"]:focus {
    border-color: #66afe9;
    outline: none;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #4c5eaf;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #070068;
}

button:active {
    background-color: #3e8e41;
}

        </style>

</form>