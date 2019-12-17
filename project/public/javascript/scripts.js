function getHomework() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {            
            var data = JSON.parse(this.responseText);
            var content = '<div class="card"><table class="table"><thead><tr><th scope="col">Homework Name</th><th scope="col">Homework Type</th><th scope="col">Due Date</th><th scope="col">&nbsp;</th></tr></thead><tbody>';
            for (x in data) {
                content += '<tr><td>' + data[x].hwname + '</td><td>' + data[x].hwtype + '</td><td>' + data[x].duedate + '</td><td><button type="button" class="btn btn-outline-danger" onclick="deleteHomework(\'' + data[x].hwname + '\')">Remove Assignment</button></td><tr>';
            }
            content += '</tbody></table></div>';
            document.getElementById("hwDisplay").innerHTML = content;
        }
    };

    xmlhttp.open("GET", "/getHomework", true);
    xmlhttp.send();
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("pwd").value;

    var params = "username=" + username + "&pwd=" + password;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {            
            if (this.responseText == 'true') {
                var content = '<button type="button" class="btn btn-secondary" onclick="logout()">Logout</button><h1 class="text-center">Your Homework Planner</h1><div class="dropdown"><button class="btn btn-primary dropdown-toggle" type="button" id="dropdownAddHomework" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add Homework</button><div class="dropdown-menu" aria-labelledby="dropdownAddHomework"><form class="px-4 py-3"><div class="form-group"><label for="username">Homework Name</label><input type="text" class="form-control" id="hwName"></div><div class="form-group"><label for="password">Homework Type</label><select id="hwType"><option value="Assignment">Assignment</option><option value="Quiz">Quiz</option><option value="Discussion Board">Discussion Board</option><option value="Project">Project</option><option value="Exam">Exam</option></select></div><div class="form-group"><label for="dueDate">Due Date</label><input type="date" class="form-control" id="dueDate"></div><div id="error"></div><button type="button" class="btn btn-primary" onclick="addHomework()">Add</button></form></div></div><button type="button" class="btn btn-primary" onclick="getHomework()">Show My Homework</button><br><br><div id="hwDisplay"></div>';
                document.getElementById("mainContent").innerHTML = content;
            } else {
                document.getElementById("error").innerHTML = "<p style='color: red;'>Invalid username or password</p>";
            }
        }
    };

    xmlhttp.open("POST", "/login", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}

function logout() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {            
            var content = '<div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sign Up / Login</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><form class="px-4 py-3"><div class="form-group"><label for="username">Username</label><input type="text" class="form-control" id="username"></div><div class="form-group"><label for="password">Password</label><input type="password" class="form-control" id="pwd"></div><div id="error"></div><button type="button" class="btn btn-primary" onclick="login()">Sign in</button></form><div class="dropdown-divider"></div><a class="dropdown-item" href="#">New around here? Sign up</a></div></div><div class="container"><h1 class="text-center">Welcome to Homework Planner</h1><p class="text-muted text-center">This web app will help you keep track of your homework. Please sign in/sign up to get started.</p></div>';
            document.getElementById("mainContent").innerHTML = content;
        }
    };
    xmlhttp.open("POST", "/logout", true);
    xmlhttp.send();
}

function addHomework() {
    var xmlhttp = new XMLHttpRequest();
    var hwName = document.getElementById("hwName").value;
    var hwType = document.getElementById("hwType").value;
    var dueDate = document.getElementById("dueDate").value;

    var params = "hwName="+hwName+"&hwType="+hwType+"&dueDate="+dueDate;

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {  
            var data = JSON.parse(this.responseText);
            var content = '<div class="card"><table class="table"><thead><tr><th scope="col">Homework Name</th><th scope="col">Homework Type</th><th scope="col">Due Date</th><th scope="col">&nbsp;</th></tr></thead><tbody>';
            for (x in data) {
                content += '<tr><td>' + data[x].hwname + '</td><td>' + data[x].hwtype + '</td><td>' + data[x].duedate + "</td><td><button type='button' class='btn btn-outline-danger' onclick='deleteHomework(\"" + data[x].hwname + "\")'>Remove Assignment</button></td><tr>";
            }
            content += '</tbody></table></div>';
            document.getElementById("hwDisplay").innerHTML = content;
        }
    };
    xmlhttp.open("POST", "/addHomework", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}

function deleteHomework(hwName) {
    var xmlhttp = new XMLHttpRequest();
    var params = "hwName=" + hwName;

    xmlhttp.onreadystatechange = ()=>{
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var content = '<div class="card"><table class="table"><thead><tr><th scope="col">Homework Name</th><th scope="col">Homework Type</th><th scope="col">Due Date</th><th scope="col">&nbsp;</th></tr></thead><tbody>';
            for (x in data) {
                content += '<tr><td>' + data[x].hwname + '</td><td>' + data[x].hwtype + '</td><td>' + data[x].duedate + '</td><td><button type="button" class="btn btn-outline-danger" onclick="deleteHomework(\'' + data[x].hwname + '\')">Remove Assignment</button></td><tr>';
            }
            content += '</tbody></table></div>';
            document.getElementById("hwDisplay").innerHTML = content;
        }
    };
    xmlhttp.open("POST", "/deleteHomework", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}

function addAccount() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var params = "firstName=" + firstName + "&lastName=" + lastName + "&email=" + email + "&username=" + username + "&pwd=" + password;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = ()=>{
        if (this.readyState == 4 && this.status == 200) {
            var content = '<button type="button" class="btn btn-secondary" onclick="logout()">Logout</button><h1 class="text-center">Your Homework Planner</h1><div class="dropdown"><button class="btn btn-primary dropdown-toggle" type="button" id="dropdownAddHomework" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add Homework</button><div class="dropdown-menu" aria-labelledby="dropdownAddHomework"><form class="px-4 py-3"><div class="form-group"><label for="username">Homework Name</label><input type="text" class="form-control" id="hwName"></div><div class="form-group"><label for="password">Homework Type</label><select id="hwType"><option value="Assignment">Assignment</option><option value="Quiz">Quiz</option><option value="Discussion Board">Discussion Board</option><option value="Project">Project</option><option value="Exam">Exam</option></select></div><div class="form-group"><label for="dueDate">Due Date</label><input type="date" class="form-control" id="dueDate"></div><div id="error"></div><button type="button" class="btn btn-primary" onclick="addHomework()">Add</button></form></div></div><button type="button" class="btn btn-primary" onclick="getHomework()">Show My Homework</button><br><br><div id="hwDisplay"></div>';
            document.getElementById("mainContent").innerHTML = content;
        }
    };
    xmlhttp.open("POST", "/deleteHomework", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}

function createAccount() {
    var content = '<form class="px-4 py-3"><div class="form-group"><label for="firstName">First Name</label><input type="text" class="form-control" id="firstName"></div><div class="form-group"><label for="ulastName">Last Name</label><input type="text" class="form-control" id="ulastName"></div><div class="form-group"><label for="email">Email</label><input type="text" class="form-control" id="email"></div><div class="form-group"><label for="username">Username</label><input type="text" class="form-control" id="username"></div><div class="form-group"><label for="password">Password</label><input type="password" class="form-control" id="pwd"></div><div id="error"></div><button type="button" class="btn btn-primary" onclick="addAccount()">Create Your Account</button></form><div class="dropdown-divider"></div><button class="btn btn-outline-secondary" type="button" onclick="loginAccount()">Already have an account? Login</button>';
    document.getElementById("dropdownMenu").innerHTML = content;
}

function loginAccount() {

}