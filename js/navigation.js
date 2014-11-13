/**
 * Created by Sam on 14-11-12.
 */

(function(){
    var nav = document.getElementById('site-navigation'),button,menu;
    if(!nav){
        return;
    }
    button = nav.getElementsByTagName("h3")[0];
    menu = nav.getElementsByTagName("ul")[0];
    if(!button){
        return;
    }
    if(!menu || menu.childNodes.length <=0){
        button.style.display = 'none';
        return;
    }

    button.onclick = function(e){
        if(menu.className.indexOf('nav-menu') == -1){
            menu.className = 'nav-menu';
        }
        if(button.className.indexOf('toggle-on') == -1){
            button.className += ' toggle-on';
            menu.className += ' toggle-on';
        }else{
            button.className = button.className.replace(' toggle-on','');
            menu.className = menu.className.replace(' toggle-on','');
        }
    };
})();
