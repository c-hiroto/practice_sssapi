(()=>{

    const shopLists = document.getElementById("js-lists");
    const ACTIVE_CLASS = 'clicked';
    const tabItems = document.getElementsByClassName("tab-item");
    const contentItems = document.getElementsByClassName("tab-content-item");
    const tabCount = document.getElementsByClassName("tab-item").length;
    


    function addList(shop) {
        //DOM操作
        const list = document.createElement("div");
        list.innerText = shop.booth_name;
        shopLists.appendChild(list);
        list.classList.add("tab-content-item");
        list.dataset.content = shop.category_num;
    };

    //データを取得
    async function getShops() {
        //データのやり取り
        return await (await (fetch("https://api.sssapi.app/vaLWfXP0I6Gmgpdp2Wbd3"))).json();
    };

    async function listShops () {
        const shops = await getShops();
        shops.forEach(addList);
        return shops
    };

    //Start関数の定義
    async function  Start () {
        const shops = await listShops();

        //クリックしたら起こるイベント
        const handleClick = (e) => {
            e.preventDefault();

            //クリックされたnavとそのdataを取得
            const $this = e.target;
            const targetVal = $this.dataset.tab;
            //クリックされたカテゴリに含まれる要素の数
            let countCategory = document.querySelectorAll('[data-content="' + targetVal + '"]').length;

            //カテゴリ選択をリセット
            let index = 0;
            while (index < tabCount) {
                tabItems[index].classList.remove(ACTIVE_CLASS);
                index++;
            }
            
            //ブース名をリセット
            index = 0;
            while(index < shops.length){
                contentItems[index].style.display = 'none';
                index++;
            }
            
            
            //対象のカテゴリをアクティブ化する
            tabItems[targetVal].classList.add(ACTIVE_CLASS);
            //対象のブース名をアクティブ化する
            index = 0;
            if (targetVal == 0) { //一覧が選択されたとき
                while(index < shops.length){
                    contentItems[index].style.display = 'block';
                    index++;
                }
            }else { //それぞれのカテゴリが選択されたとき
                index = 0;
                while (index < countCategory) {
                    document.querySelectorAll('[data-content="' + targetVal + '"]')[index].style.display = 'block';
                    index++;
                }
            }
            
        };

        //全tab要素に対して関数を適応・発火
        let index = 0;
        while(index < tabCount){
            document.getElementsByClassName("tab-item")[index].addEventListener('click', (e) => handleClick(e));
            index++;
        };

    };

    //実行する関数
    Start();
    
})();