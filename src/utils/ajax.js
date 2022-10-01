let postRequest_v2 = (url, data, callback) => {
    let formData = new FormData();

    for (let p in data) {
        if (data.hasOwnProperty(p))
            formData.append(p, data[p]);
    }

    let opts = {
        method: "POST",
        body: formData,
        credentials: "include"
    };

    fetch(url, opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

let postRequest = (url, json, callback) => {

    let opts = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    fetch(url, opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export {postRequest, postRequest_v2};

export const oldRequest = (url, method, name = '') => {
    let opts = {
        method: method,
        //请求时添加Cookie
        credentials: "include"
    };
    return new Promise(function (resolve, reject) {
        fetch(url, opts)
            .then(response => response.json())
            .then(result => {
                console.log("SUCCESS in " + name + ":", result);
                resolve(result);
            })
            .catch(error => {
                console.log("ERROR in " + name + ":", error);
                reject(error);
            });
    });
};