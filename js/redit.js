var app = angular.module('reditApp',['xml','ngSanitize']);


app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
  });

app.controller('mainCtrl',['$scope','$http','$sce',function($scope,$http,$sce) {
    
    $http({
        url: "./niki.xml", 
        method : 'get',
        headers : {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers" : "X-Requested-With"
        },
    })
    .success(function(data, status, headers, config){
        $scope.feed = data.feed;
        $scope.entry = $scope.feed.entry;
        
        $scope.headLink = [];
        $scope.imgLink = [];

        console.log($scope.entry[0]);

        // Genrating head link from ccontent
        genrateHeadLink = function(i){  
            var elements = $(i);
            var found = $('a', elements);
            if(i.indexOf("img") != -1 ){      
                return found[3].toString(); 
            }

            return found[2].toString();  
            
        }

        //Generating image link from content 
        genrateImgLink = function(i){
            if(i.indexOf("img") == -1 ){      
                // console.log("1")
                return ""; 
            }
           temp1 = i.slice(i.indexOf("img src") + 9);
           temp2 = temp1.indexOf('"');
           return temp1.slice(0,temp2);
        }

        for(i in $scope.entry){
            r = $scope.entry[i].content.__text.replace("&#32;", "<table> <tr><td>");
            $scope.headLink.push(genrateHeadLink(r));
            $scope.imgLink.push(genrateImgLink(r));
        }

        $scope.remove =function(i){
        temp4 = [];
        temp5 = [];
        temp2 = [];


        for(var temp3 = 0; temp3 < i; temp3++){
            temp2.push($scope.entry[temp3]);
            temp4.push($scope.imgLink[temp3]);
            temp5.push($scope.headLink[temp3]);
        }
        temp3++;
        for(; temp3 < $scope.entry.length; temp3++){
            temp2.push($scope.entry[temp3]);
            temp4.push($scope.imgLink[temp3]);
            temp5.push($scope.headLink[temp3]);
            }

        $scope.entry = temp2;
        $scope.imgLink = temp4;
        $scope.headLink = temp5;
        
        }

    })
    .error(function(data, status, headers, config){
    })

    // For current time and time spent

    setInterval(function() {
        m = $('.minuteactive').text();
        s = $('.secondactive').text();
        temps = parseInt(s);
        temps++;
        if(temps == 59){
            temps = 0;
            tempm = parseInt(m);
            tempm++;    
            $('.minuteactive').text(tempm);
        } 
        $('.secondactive').text(temps);
        date = new Date();
        $('.aajkasamay').text(date.getHours() + " : " + date.getMinutes() + " : " + date.getSeconds() ); //"2011-12-19T15:28:46.493Z"
        

    }, 1000);


    //for time spend and tab active

    $(window).on("blur focus", function(e) {
    var prevType = $(this).data("prevType");

    if (prevType != e.type) {
        switch (e.type) {
            case "blur":
                $('.second').removeClass("secondactive");
                break;
            case "focus":
                $('.second').addClass("secondactive");
                break;
        }
    }

    $(this).data("prevType", e.type);
})


}]);