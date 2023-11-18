import { useState } from "react";

const useAppBadge = () => {
    const [counter, setCounter] = useState(1);

    const setBadge = () => {
        if (navigator.setAppBadge) {
            navigator.setAppBadge(counter);
        }
        else if (navigator.setClientBadge) {
            navigator.clearClientBadge();
        }

    }

    const clearBadge = () => {

    }

    return [setBadge, clearBadge];
}

export default useAppBadge;