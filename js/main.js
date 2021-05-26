(() => {

    let yOffset = 0; // window.pageYOffset 대신 쓸 변수 (이렇게 하면 편하니까)
    let prevScrollHeight = 0; // 현재 스크롤 위치 (yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합
    let currentScene = 0; //현재 활성화 된 (눈 앞에 보이는) 씬 (scroll-section)

    const sceneInfo = [
        {
            //0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0')
            }
        },
        {   
            //1
            type: 'normal',
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {   
            //2
            type: 'sticky',
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {   
            //3
            type: 'sticky',
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        },       
    ];

    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; // 스크롤 높이를 강제로 늘려주어 스크롤이 많이 되게 하는 부분
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; // 늘려준 스크롤 높이를 html상에 높이로 지정해주는 부분
        }
    }

    function scrollLoop() {
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) { //활성화 씬 png 참조
            currentScene++;
        }

        if (yOffset < prevScrollHeight) {
            if (currentScene === 0) return; // current씬이 -값이 되는 것을 방지
            currentScene--;
        }

        console.log(currentScene);
    }

    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    setLayout();

})();