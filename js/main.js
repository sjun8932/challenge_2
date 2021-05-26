(() => {

    let yOffset = 0; // window.pageYOffset 대신 쓸 변수 (이렇게 하면 편하니까)

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
        
    }

    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    setLayout();

})();