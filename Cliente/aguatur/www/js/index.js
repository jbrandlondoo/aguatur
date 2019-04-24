/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 // variables con los div padres
var initApp,panelRegisterLogin,login,register;
var app = {
    initilize:function(){
        // asignacion de variables
        initApp = document.getElementById("initApp");
        panelRegisterLogin = document.getElementById("panelRegisterLogin");
        login = document.getElementById("login");
        register = document.getElementById("register");
        document.getElementById("register")
        panelRegisterLogin.className = "hidden";
        login.className = "hidden";
        register.className = "hidden";
        setTimeout(function(){
            initApp.className = "hidden";
            panelRegisterLogin.className = "toShow";
        }, 5000);
        //
    }

};
app.initilize();