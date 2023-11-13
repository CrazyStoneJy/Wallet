enum CostType {
    SHOPPING = 1,
    TRANSPORT = 2,
}

type CostMoneyEnity = {
    timestamp: number;
    cost: number;
    desc: string;
    type: CostType;
}

function CostStorageManager() {

    function init() {
        console.log("init costStorageManager");
        
    }

    function add(entity: CostMoneyEnity) {

    }

    return {
        init,
        add
    }

}

const costStorageManager = CostStorageManager();

export default costStorageManager;