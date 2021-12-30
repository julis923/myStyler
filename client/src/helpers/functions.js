const contentExists = (section) => {
    let found = false;
    section.forEach((sub) => {
        if (sub.text) {
            found = true;
        }
        if (Object.keys(sub)) {
            Object.keys(sub).forEach((key) => {
                if (sub[key].text) {
                    found = true;
                }
                try {
                    sub[key].forEach(el => {
                        if (el.text) {
                            found = true;
                        }
                        try {
                            Object.keys(el).forEach((subEl) => {
                                if (el[subEl].text) {
                                    found = true;
                                }
                            })
                        } catch {
                            return;
                        }
                    })
                }catch{
                    return;
                }
            })
        }
    })
    if (found) {
        return true;
    }
    return false;
}

const numNodes = (section) => {
    let nodes = 0;
    section.forEach((item, i) => {
        if (item.text) {
            nodes++
        }
    })
    return nodes;
}

export {contentExists, numNodes}