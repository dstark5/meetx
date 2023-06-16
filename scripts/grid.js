var div=document.querySelector('div[id="videoGrid"]')
var container=document.querySelectorAll('div[data="video"]')
var display=document.querySelector('div[id="display"]')
var usrStream=document.querySelector('video[id="usrStream"]')
var width=div.offsetWidth
var height=div.offsetHeight
var element=div.childElementCount

function update(){
    container=document.querySelectorAll('div[data="video"]')
    width=div.offsetWidth
    height=div.offsetHeight
    element=div.childElementCount
    resize()
    
}

function resize(){
        let max = 0
        for(let z = 1;z < width+height;z++) {
            let containerSize = contain(z);
            if (containerSize === false) {
                max = z - 1;
                break;
            }
        }
        max = max - 35;
    container.forEach(e=>{
        e.style=`height:${max}px;width:${max}px`
    })

}

function contain(xz){
        let i = 0;
        let w = 0;
        let h = xz;
        while (i<(div.childElementCount)) {
            if ((w + xz) > width) {
                w = 0;
                h = h + xz;
            }
            w = w + xz;
            i++;
        }
        if (h > height || xz > width) return false;
        else return xz;

}

export default update;