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

        yOffset = window.pageYOffset;

        let totalScrollHeight = 0; //페이지가 특정 위치에서 새로고침(F5) 가 되었을 경우를 totalScrollHeight와 yOffset과의 관계설정으로 나타낸다.
        for (let i = 0; i <sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    function scrollLoop() { 
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) { //활성화 씬 png 참조
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (yOffset < prevScrollHeight) {
            if (currentScene === 0) return; // current씬이 -값이 되는 것을 방지 (모바일 또는 ios 기기)
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    // window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('load', setLayout); // DomContentload와 load의 차이 : load는 웹페이지에 있는 모든 리소스를 다운받고 나서야 작동 Domcontentload는 html 돔구조만 로드되면 실행됨. 그래서 후자가 좀더 빨리 실행됨
    window.addEventListener('resize', setLayout);
    setLayout(); // 이 함수는 --> 0. 레이아웃을 초기화 한다. 1. 각 sceneInfo 배열에 있는 각 scene의 스크롤 높이를 잡아주고 실제 html의 스크롤 높이에 세팅을 한다

})();