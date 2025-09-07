function showPopup(message) {
    document.getElementById("popupMessage").textContent = message;
    document.getElementById("customPopup").style.display = "flex";
  }

  function onOk() {
    // alert("You clicked OK");
    document.getElementById("MessagePop").style.display = "none";
    document.getElementById("overlaypop").style.display = "none";


  }

  function onCancel() {
    // alert("You clicked Cancel");    
    document.getElementById("MessagePop").style.display = "none";
    document.getElementById("overlaypop").style.display = "none";

  }


  function showMessagePop(Show,Message="")
  {
    showhideDiv(false,"ActivityPop");
    const MessagePop = document.getElementById("MessagePop");
    if (MessagePop)
      {      
        if (Show)
          {
            MessagePop.style.display='block'
            MessagePop.style.display = "flex";
          }
          else
          {
            MessagePop.style.display='none'
          }
          const popupMessage =  document.getElementById("popupMessage");
          if (popupMessage)
            {
              popupMessage.textContent = Message;
            }
      }

  }


function showPopup(overlaypop) {
  document.getElementById(overlaypop).classList.add('show');
}

function hidePopup(overlaypop) {
  document.getElementById(overlaypop).classList.remove('show');
  showhideDiv(false, overlaypop, "");
}

function showhideDiv(state, id, BusyMsg = "") {
  try {
    if (BusyMsg != "") {
      var BusyMsgobj = document.getElementById("BusyPopMsg");
      BusyMsgobj.innerHTML = BusyMsg
    }

    var e = document.getElementById(id);
    if (e) {
      if (state == true) {
        e.style.display = 'block'
      }
      else {
        e.style.display = 'none'
      }
    }
    // e.style.display = (e.style.display == 'block') ? 'none' : 'block';
  } catch (error) {

  }
}