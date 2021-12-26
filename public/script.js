$(document).ready(
    function () {
        // Initialize the page
        var token = localStorage.getItem("x-auth-token")

        if (token) {



        }


        $('#signin').click(function () {
            //do an ajax post request using jquery

            $.ajax({
                url: '/api/admin/signin',
                type: 'POST',
                data: {
                    username: $('#username').val(),
                    password: $('#password').val()
                },


                success: function (data) {
                    console.log(data)
                    //if the data is successful, store the token in local storage
                    localStorage.setItem("x-auth-token", data.token)
                    cookie.set("x-auth-token", data.token)
                    //redirect to the home page
                    window.location.reload()
                },
                error: function (data) {
                    //if the data is unsuccessful, display an error message
                    alert('error signing in')
                }

            })
        })

    }
)