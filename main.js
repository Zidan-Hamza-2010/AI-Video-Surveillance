function setup()
{
    canvas = createCanvas(380, 380);
    canvas.position(450, 200);
}

video = "";
object = [];
status = "";

function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}

function draw()
{
    image(video, 0, 0, 380, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects_detected").innerHTML = "Number of objects detected : " + object.length;

            fill("#FF0000");
            percentage = floor(object[i].confidence * 100);
            text(object[i].label + " " + percentage + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    object = results;
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function modelLoaded()
{
    console.log("model Is Loaded");
    status = true;
    video.loop();
    video.volume(0);
    video.speed(1);
}