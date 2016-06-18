/**
 * Created by q on 18.06.16.
 */
window.onload=()=>{
    window.onload=null;
    var sum={bankBuy:0,
        bankSell:0,
    bankCount:0,
    cardBuy:0,
        cardSell:0,
    cardCount:0};
    Array.from(document.getElementsByTagName('tbody')[0].childNodes).forEach(x=>{
        if(x.nodeName=='TR'){
        var buyB=+x.childNodes[3].textContent,
            sellB=+x.childNodes[7].textContent,
            buyC=+x.childNodes[9].textContent,
            sellC=+x.childNodes[13].textContent
        if(buyB){
            sum.bankBuy+=buyB;
            sum.bankCount++;
            sum.bankSell+=sellB;
        }
        if(buyC){
            sum.cardBuy+=buyC;
            sum.cardCount++;
            sum.cardSell+=sellC;
        }
        }
    });

    document.getElementById('sellB').innerHTML+=sum.bankSell/sum.bankCount;
    document.getElementById('buyB').innerHTML+=sum.bankBuy/sum.bankCount;
    document.getElementById('buyC').innerHTML+=sum.cardSell/sum.cardCount;
    document.getElementById('sellC').innerHTML+=sum.cardBuy/sum.cardCount;


    var input=document.getElementsByClassName('js-mfcur-table-search')[0]
    input.onkeyup=()=>{
        Array.from(document.getElementsByTagName('tbody')[0].childNodes).forEach(x=>{
            if (x.nodeName=='TR'){

                if(x.childNodes[1].textContent.toLowerCase().indexOf(input.value.toLowerCase())==-1){
                    if (!x.getAttribute('style'))
                    x.style.display='none'
                }
                else if (x.getAttribute('style'))
                    x.removeAttribute('style')
            }

        })
    }
}
