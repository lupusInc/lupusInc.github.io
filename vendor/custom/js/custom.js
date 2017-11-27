// Event functions
function OnLoad() {
  console.log("Loaded"); //event log
  $(".contentblock").css("height", $(document).height());
  countPages();
  resetPages();
}

function Scroll() {
  console.log("Scrolled"); //event log
  // Height can change on mobile whilst scrolling e.g chrome
  scalePage();
}

function Resize() {
  console.log("Resized"); //event log
  scalePage();
  straightPage();
}
// Events
//
//Trigger OnLoad() when page is fully loaded.
$(document).ready(function() {
  OnLoad();
})
//
//When page is scrolled
$(window).scroll(function() {
  Scroll();
});
$(window).resize(function() {
  Resize();
});
//
//Functions
var currentPage = 0;
var pages = 0;

function countPages() {
  pages = 0;
  for (var found = false; !found;) {
    if ($(".page" + pages).length == 1) {
      pages++;
    } else {
      found = true;
      pages--;
    }
  }
}

function movePage(newPage, down) {
  // Enable animation
  $(".page" + currentPage).css("transition", "1s");
  $(".page" + newPage).css("transition", "1s");
  // Place the currentPage above or under the visible screen, depending on direction
  if (down) {
    $(".page" + currentPage).css("top", -$(document).height() + "px");
  } else {
    $(".page" + currentPage).css("top", $(document).height() + "px");
  }
  // "Freeze" the page so it wont cause any issues while hidden
  $(".page" + currentPage).css("position", "fixed");
  // Bring in the new page
  $(".page" + newPage).css("top", "0px");
  // Wait for the animation
  setTimeout(function() {
    $(".page" + newPage).css("position", "initial");
    // Disable animation
    $(".page" + currentPage).css("transition", "0s");
    $(".page" + newPage).css("transition", "0s");
    // Upadte currentPage
    currentPage = newPage;
    // Fix any placement issues
    straightPage();
  }, 1000);

}

function straightPage() {
  for (var i = 0; i <= pages; i++) {
    if (i !== currentPage) {
      if (i < currentPage) {
        $(".page" + i).css("top", -$(document).height() + "px");
      } else if (i > currentPage) {
        $(".page" + i).css("top", $(document).height() + "px");
      }
    }
  }
}

function resetPages() {
  for (var i = 0; i <= pages; i++) {
    if (i == currentPage) {
      j = 0;
    } else {
      j = $(document).height();
    }
    $(".page" + i).css("top", j + "px");
  }
}

function scalePage() {
  $(".contentblock").css("height", $(window).height()); // Reset the height
  $(".contentblock").css("height", $(document).height()); // Set the actual height
}
