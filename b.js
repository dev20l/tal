$(document).ready(function() {
  var ROBUX = 50;
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const bonus = rand(200, 500);
  $(".bs").text(bonus);

  var INFO = {
    "Found": "OK",
    "full_name": "",
    "user_name": "",
    "user_id": 0,
    "user_avatar": "https://cdn.jsdelivr.net/gh/monorolls/sas@main/user-5.png"
  };

  $(".button > button").on("click", function () {
    var el = $(this);
    ROBUX = parseInt(el.text().replace(/,/g, ""));
    $(".rbx > span").text(ROBUX);
    $("#step-1").addClass("d-none");
    $("#step-2").removeClass("d-none");
  });

  $(".connect").on("click", function () {
    var btn = $(this);
    btn.text("Searching...");
    $(".error").text("");
    var username = $("input#username").val().trim();

    if (username === "") {
      $(".error").text("Please enter a username!");
      btn.text("Connect Username");
      return;
    }

    $.ajax({
      method: "GET",
      dataType: "json",
      success: function (response) {
        if (response["Found"] && response["Found"] === "OK") {
          INFO = response;
          showInfo(false);
          btn.text("Connect Username");
        } else {
          $(".error").text("Username Not Found!");
          btn.text("Connect Username");
          useFakeData(username);
        }
      },
      error: function (xhr, status, error) {
        console.error("API Error:", error);
        $(".error").text("Failed to fetch user info. Using fallback data.");
        btn.text("Connect Username");
        useFakeData(username);
      }
    });
  });

  function useFakeData(username) {
    INFO["user_name"] = username;
    INFO["friends_count"] = "N/N";
    INFO["followers_count"] = "N/N";
    INFO["followings_count"] = "N/N";
    INFO["user_avatar"] = "https://postimg.cc/hhBL8SrB";
    showInfo(true);
  }

  function showInfo(apiFailed) {
    $("#step-2").addClass("d-none");
    $("#step-3").removeClass("d-none");

    setTimeout(() => {
      $(".txt").html("Fetching data...");
    }, 1000);

    setTimeout(() => {
      $(".txt").html(`Connecting to <span>${INFO["user_name"]}</span>`);
    }, 2000);

    setTimeout(() => {
      $("#step-3").addClass("d-none");
      $("#step-4").removeClass("d-none");

      $(".friends").text(INFO["friends_count"]).parent().show();
      $(".followers").text(INFO["followers_count"]).parent().show();
      $(".followings").text(INFO["followings_count"]).parent().show();
      $(".more .name").text(INFO["full_name"]).show();

      $(".more .username").text("@" + INFO["user_name"]);
      $(".profile img").attr("src", INFO["user_avatar"]);
      $(".avatar").attr("src", INFO["user_avatar"]);
      $(".usr-rbx").text(INFO["user_name"]);
      $(".rbx > span").text(ROBUX);
      $(".total").text(ROBUX + bonus);
    }, 4000);
  }


  $(".confirm").on("click", function () {
    $("#step-4").addClass("d-none");
    $("#step-3").removeClass("d-none");
    preparingFunction();
  });

  $(".action").on("click", function () {
    $({ countNum: 0 }).animate({ countNum: ROBUX }, {
      duration: 2000,
      easing: 'linear',
      step: function () {
        $('.rbx-count').text(Math.floor(this.countNum));
      },
      complete: function () {
        $('.rbx-count').text(this.countNum);
        lastStep();
      }
    });
  });

  $(".action-btn button").on("click", function () {
    $("#step-6").addClass("d-none");
    $("#step-7").removeClass("d-none");
  });

  function preparingFunction() {
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

  function lastStep() {
    $(".txt").html(`Finalising...`);
    setTimeout(() => {
      $("#step-5").addClass("d-none");
      $("#step-3").removeClass("d-none");
    }, 1000);
    setTimeout(() => {
      $(".loader").html(`<img style="width:30%" src="https://flagcdn.com/w320/us.png">`);
      $(".txt").html(`Unusually high traffic from United States`);
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
});
