(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{48312:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return c(75197)}])},75197:function(a,b,c){"use strict";c.r(b),c.d(b,{default:function(){return T}});var d=c(26042),e=c(828),f=c(85893),g=c(67294),h=c(18972),i=c(86886),j=c(87357),k=c(15861),l=c(94054),m=c(83321),n=c(45984),o=c(77651),p=c(85945),q=c(33340),r=c(66242),s=c(44267),t=function(a){var b,c,d,e,g=a.treasuryETFData,h=a.walletETFData,i=["","K","M","B","T"],l=function(a){return Math.floor(Math.log10(a)/3)},m=function(a){var b=l(a),c=(a/Math.pow(1e3,b)).toFixed(0);return"".concat(c).concat(i[b])};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(j.Z,{mt:3,mb:2,children:(0,f.jsx)(k.Z,{variant:"body1",children:h.description})}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem"},children:[(0,f.jsx)(r.Z,{children:(0,f.jsxs)(s.Z,{children:[(0,f.jsx)(k.Z,{variant:"subtitle1",color:"textSecondary",align:"center",children:"Price"}),(0,f.jsx)(j.Z,{display:"flex",justifyContent:"center",alignItems:"center",children:(0,f.jsx)(k.Z,{variant:"h6",children:(b=g.nav).toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2})})})]})}),(0,f.jsx)(r.Z,{children:(0,f.jsxs)(s.Z,{children:[(0,f.jsx)(k.Z,{variant:"subtitle1",color:"textSecondary",align:"center",children:"Market Cap"}),(0,f.jsx)(j.Z,{display:"flex",justifyContent:"center",alignItems:"center",children:(0,f.jsx)(k.Z,{variant:"h6",children:(d=l(c=g.aum),e=(c/Math.pow(1e3,d)).toFixed(1),"$".concat(e).concat(i[l(c)]))})})]})}),(0,f.jsx)(r.Z,{children:(0,f.jsxs)(s.Z,{children:[(0,f.jsx)(k.Z,{variant:"subtitle1",color:"textSecondary",align:"center",children:"Circulating Supply"}),(0,f.jsx)(j.Z,{display:"flex",justifyContent:"center",alignItems:"center",children:(0,f.jsx)(k.Z,{variant:"h6",children:m(g.sharesOutstanding)})})]})}),(0,f.jsx)(r.Z,{children:(0,f.jsxs)(s.Z,{children:[(0,f.jsx)(k.Z,{variant:"subtitle1",color:"textSecondary",align:"center",children:"Wallet Balance"}),(0,f.jsx)(j.Z,{display:"flex",justifyContent:"center",alignItems:"center",children:(0,f.jsx)(k.Z,{variant:"h6",children:m(h.inWallet)})})]})})]})]})},u=c(14924),v=c(90948),w=c(41796),x=c(1169),y=c(85874),z=c(73490),A=c(25675),B=c.n(A),C=function(a){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(a)},D=(0,v.ZP)(y._)(function(a){var b,c=a.theme;return b={},(0,u.Z)(b,"& .".concat(z._.row,".even"),{backgroundColor:c.palette.grey[200]}),(0,u.Z)(b,"& .".concat(z._.row),{"&:hover, &.Mui-hovered":{backgroundColor:(0,w.Fq)(c.palette.primary.main,.2),"@media (hover: none)":{backgroundColor:"transparent"}},"&.Mui-selected":{backgroundColor:(0,w.Fq)(c.palette.primary.main,.2+c.palette.action.selectedOpacity),"&:hover, &.Mui-hovered":{backgroundColor:(0,w.Fq)(c.palette.primary.main,.2+c.palette.action.selectedOpacity+c.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(0,w.Fq)(c.palette.primary.main,.2+c.palette.action.selectedOpacity)}}}}),b}),E=function(){var a=(0,q.T)(),b=(0,q.C)(function(a){return a.treasuryData}),c=b.cryptoData,d=b.isLoading;b.ETFs,(0,g.useEffect)(function(){a((0,x.Pp)())},[a]);var h=Object.values(c).reduce(function(a,b){return a+b.marketCap},0),i=Object.entries(c).map(function(a){var b,c,d=(0,e.Z)(a,2),f=d[0],g=d[1];return{id:f,icon:g.ticker.toLowerCase(),name:g.name,ticker:g.ticker,price:g.price,weight:(b=g.marketCap,+(b/(c=h)*100).toFixed(2)),marketCap:g.marketCap}}).sort(function(a,b){return b.marketCap-a.marketCap}),j=function(a){return a.indexRelativeToCurrentPage%2==0?"even":"odd"};return(0,f.jsx)("div",{style:{height:"auto",width:"auto"},children:(0,f.jsx)(D,{autoHeight:!0,columns:[{field:"icon",headerName:"",align:"center",headerAlign:"center",sortable:!1,renderCell:function(a){return(0,f.jsx)(B(),{src:"/".concat(a.row.ticker.toLowerCase(),".svg"),alt:a.row.ticker,width:24,height:24})},minWidth:24,headerClassName:"custom-header"},{field:"name",headerName:"Name",align:"left",headerAlign:"left",flex:1,minWidth:100,headerClassName:"custom-header"},{field:"ticker",headerName:"Ticker",align:"center",headerAlign:"center",flex:1,minWidth:75,headerClassName:"custom-header"},{field:"price",headerName:"Price",type:"number",align:"right",headerAlign:"right",flex:1,valueFormatter:function(a){return null==a.value?"":C(a.value)},minWidth:100,headerClassName:"custom-header"},{field:"marketCap",headerName:"Market Cap",type:"number",align:"right",headerAlign:"right",valueFormatter:function(a){return null==a.value?"":C(a.value)},flex:1,minWidth:175,headerClassName:"custom-header"},{field:"weight",headerName:"Target Weight",flex:1,align:"right",headerAlign:"right",minWidth:75,valueFormatter:function(a){var b=a.value;if("number"!=typeof b)return"";var c=b.toFixed(2);return"".concat(c,"%")},headerClassName:"custom-header"},],rows:i,loading:d,getRowClassName:j,components:{Toolbar:function(){return null}},sx:{boxShadow:2,"& .custom-header":{fontWeight:"bolder",fontSize:"1.1rem",backgroundColor:"#f7f7f7"},"& .MuiDataGrid-cell:hover":{color:"primary.main"}}})})},F=c(7906),G=c(295),H=c(53252),I=c(72882),J=c(53184),K=c(53816),L=c(35991),M=function(){var a=(0,q.T)(),b=(0,q.C)(function(a){return a.buySellState}).buySell,c=(0,q.C)(function(a){return a.walletCryptoData}),d=c.etfs,h=c.selectedHelixFund,i=c.selectedToken,j=c.tokensInWallet,k=d[h];(0,g.useEffect)(function(){a((0,x.Pp)()),a((0,L.rK)(i.ticker))},[a]);var l=Object.entries((null==k?void 0:k.tokens)||{}).map(function(a){var c,d,f,g,h=(0,e.Z)(a,2),i=h[0],k=h[1];return c=i,d=j[i],f=k.targetWeight,g="buy"===b?k.buyFee:k.sellFee,{token:c,inWallet:d,weight:f,fees:g}}),m=function(b){a((0,L.rK)(b))},n=(0,q.C)(function(a){return a.buySellState}).buttonColor,o=(0,q.C)(function(a){return a.buySellState}).buttonHighlightColor,p=function(a){var b,c=null===(b=null==k?void 0:k.tokens[a])|| void 0===b?void 0:b.selected,d=(0,w.Fq)(n,.3),e=(0,w.Fq)(o,.1);return{"&:last-child td, &:last-child th":{border:0},backgroundColor:c?d:"inherit","&:hover, &.Mui-hovered":{backgroundColor:c?d:e,cursor:"pointer"},"&.Mui-selected":{backgroundColor:c?d:"inherit",color:c?"white":"black"}}},r={fontWeight:"500",fontSize:"0.9rem"},s={display:"flex",alignItems:"center",gap:"8px"};return(0,f.jsx)("div",{children:(0,f.jsx)(I.Z,{sx:{maxHeight:"100%"},children:(0,f.jsxs)(F.Z,{"aria-label":"simple table",children:[(0,f.jsx)(J.Z,{children:(0,f.jsxs)(K.Z,{style:{backgroundColor:"#f7f7f7"},children:[(0,f.jsx)(H.Z,{style:r,children:"Token"}),(0,f.jsx)(H.Z,{style:r,align:"right",children:"# in wallet"}),(0,f.jsx)(H.Z,{style:r,align:"right",children:"Weight"}),(0,f.jsx)(H.Z,{style:r,align:"right",children:"Fees"})]})}),(0,f.jsx)(G.Z,{component:"tbody",children:l.map(function(a){return(0,f.jsxs)(K.Z,{sx:p(a.token),onClick:function(){return m(a.token)},children:[(0,f.jsx)(H.Z,{component:"th",scope:"row",sx:p(a.token),children:(0,f.jsxs)("div",{style:s,children:[(0,f.jsx)(B(),{src:"/".concat(a.token.toLowerCase(),".svg"),alt:a.token,width:24,height:24}),(0,f.jsx)("span",{children:a.token})]})}),(0,f.jsxs)(H.Z,{align:"right",sx:p(a.token),children:[a.inWallet," "]}),(0,f.jsx)(H.Z,{align:"right",sx:p(a.token),children:a.weight}),(0,f.jsx)(H.Z,{align:"right",sx:p(a.token),children:a.fees})]},a.token)})})]})})})},N=c(61903),O=c(64637),P=function(){var a=(0,q.C)(function(a){return a.buySellState}).buySell,b=(0,q.C)(function(a){return a.buySellState}).buttonColor,c=(0,q.C)(function(a){return a.buySellState}).buttonHighlightColor,d=(0,q.C)(function(a){return a.walletCryptoData}).selectedHelixFund,e=(0,q.C)(function(a){return a.walletCryptoData}).selectedToken,h=(0,g.useState)(0),i=h[0],k=h[1],l=(0,g.useState)(0),n=l[0],o=l[1],p=(0,q.T)(),r=function(a){var b=parseFloat(a.target.value);k(b),o(0)},s=function(a){var b=parseFloat(a.target.value);o(b),k(0)},t=function(){if(e){var b=e.ticker,c=e.buyFee,f=e.sellFee,g="buy"===a?n:i,h="buy"===a?c:f,j=e.price,l=g*h;p((0,L.Mw)({etfTicker:d,quantity:g})),"buy"===a?p((0,x.Gq)({ticker:d,tokenTicker:b,amount:g,tokenPrice:j,fee:l})):p((0,x.qb)({ticker:d,tokenTicker:b,amount:g,tokenPrice:j,fee:l})),k(0),o(0)}};return(0,f.jsxs)("div",{children:[(0,f.jsxs)(j.Z,{sx:{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"},children:[(0,f.jsx)(m.Z,{variant:"contained",sx:{width:"50%",height:"55px",backgroundColor:"buy"===a?b:"#bfbfbf",color:"buy"===a?"white":"black",fontWeight:"bold","&:hover":{background:c}},onClick:function(){return p((0,O.AD)("buy"))},children:"Buy"}),(0,f.jsx)(m.Z,{variant:"contained",sx:{width:"50%",height:"55px",backgroundColor:"buy"===a?"#bfbfbf":b,color:"buy"===a?"black":"white",fontWeight:"bold","&:hover":{background:c}},onClick:function(){return p((0,O.AD)("sell"))},children:"Sell"})]}),(0,f.jsxs)(j.Z,{component:"form",sx:{"& > :not(style)":{m:1,width:"100%"}},noValidate:!0,autoComplete:"off",children:[(0,f.jsx)(N.Z,{id:"filled-basic",label:"Pay",variant:"filled",inputProps:{style:{height:"50px"}},value:i||"",onChange:r}),(0,f.jsx)(N.Z,{id:"filled-basic",label:"Receive",variant:"filled",inputProps:{style:{height:"50px"}},value:n||"",onChange:s}),(0,f.jsx)(N.Z,{id:"filled-basic",label:"Fees",variant:"filled",inputProps:{style:{height:"50px"}}})]}),(0,f.jsx)(m.Z,{variant:"contained",sx:{width:"100%",height:"60px",backgroundColor:b,fontWeight:"bold","&:hover":{background:c}},onClick:t,children:"buy"===a?"buy":"sell"})]})},Q=function(){var a=(0,q.C)(function(a){return a.buySellState}).buySell,b=(0,q.C)(function(a){return a.buySellState}).buttonColor,c=(0,q.C)(function(a){return a.buySellState}).buttonHighlightColor,d=(0,q.C)(function(a){return a.walletCryptoData}),g=d.etfs,k=d.selectedHelixFund,m=(0,q.T)(),n=function(a){m((0,L.i6)(a.target.value))},o=Object.entries(g).map(function(b){var c=(0,e.Z)(b,2),d=c[0],g=c[1];return(0,f.jsxs)(h.Z,{value:d,children:["buy"===a?"Buy":"Sell"," ",g.name]},d)});return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(j.Z,{sx:{maxHeight:"60px",backgroundColor:b,marginBottom:"0.2rem","&:hover":{background:c}},children:(0,f.jsx)(l.Z,{fullWidth:!0,children:(0,f.jsx)(p.Z,{labelId:"market-name",id:"market-name",value:k,label:"Market",onChange:n,sx:{color:"white",fontWeight:"bold",textAlign:"center"},children:o})})}),(0,f.jsxs)(i.ZP,{container:!0,spacing:2,p:3,children:[(0,f.jsx)(i.ZP,{item:!0,xs:12,children:(0,f.jsx)(j.Z,{sx:{display:"flex",justifyContent:"center",alignItems:"center",mb:2}})}),(0,f.jsx)(i.ZP,{item:!0,xs:6,children:(0,f.jsx)(M,{})}),(0,f.jsx)(i.ZP,{item:!0,xs:6,children:(0,f.jsx)(P,{})})]})]})},R=c(46901),S=g.forwardRef(function(a,b){return(0,f.jsx)(R.Z,(0,d.Z)({elevation:6,ref:b,variant:"filled"},a))});function T(){var a=(0,q.T)(),b=(0,q.C)(function(a){return a.walletCryptoData}),c=b.etfs,d=b.selectedHelixFund,r=(0,q.C)(function(a){return a.treasuryData}).ETFs;(0,g.useEffect)(function(){document.title="Buy and Sell"},[]);var s=(0,e.Z)(g.useState(!1),2),u=s[0],v=s[1],w=(0,e.Z)(g.useState(""),2),x=w[0],y=w[1],z=function(){y("")},A=function(){v(!0),a((0,O.AD)("buy")),a((0,L.rK)("btc"))},B=function(){v(!0),a((0,O.AD)("sell")),a((0,L.rK)("btc"))},C=function(){v(!1),y("Test")},D=function(b){a((0,L.i6)(b.target.value))},F=Object.entries(c).map(function(a){var b=(0,e.Z)(a,2),c=b[0],d=b[1];return(0,f.jsx)(h.Z,{value:c,children:d.name},c)});return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(i.ZP,{container:!0,mt:2,children:(0,f.jsxs)(i.ZP,{item:!0,xs:12,children:[(0,f.jsxs)(j.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,f.jsx)(k.Z,{variant:"h4",children:"Buy and Sell Helix Funds"}),(0,f.jsx)(l.Z,{sx:{width:"80%",mt:3},children:(0,f.jsx)(p.Z,{labelId:"market-name",id:"market-name",value:d,onChange:D,sx:{background:"#3F51B5",color:"white",fontSize:18,fontWeight:"bold",textAlign:"center",borderRadius:3,"&:hover":{background:"#1565c0"}},children:F})}),(0,f.jsx)(t,{walletETFData:c[d],treasuryETFData:r[d]})]}),(0,f.jsxs)(j.Z,{sx:{display:"flex",justifyContent:"center"},mt:3,children:[(0,f.jsx)(m.Z,{variant:"contained",sx:{backgroundColor:"#3F51B5",mr:2,"&:hover":{background:"#1565c0"}},onClick:A,children:"Buy HTM"}),(0,f.jsx)(n.Z,{open:u,onClose:C,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,f.jsx)(j.Z,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,p:4},children:(0,f.jsx)(Q,{})})}),(0,f.jsx)(m.Z,{variant:"contained",sx:{backgroundColor:"#d32f2f","&:hover":{background:"#ef5350"}},onClick:B,children:"Sell HTM"})]})]})}),(0,f.jsx)(i.ZP,{container:!0,mt:2,children:(0,f.jsx)(i.ZP,{item:!0,xs:12,children:(0,f.jsxs)("div",{style:{margin:"20px 20px 50px 50px"},children:[(0,f.jsx)("div",{style:{margin:"0px 0px 25px 0px",textAlign:"center"},children:(0,f.jsx)(k.Z,{variant:"h5",children:"Cryptocurrency Market Caps"})}),(0,f.jsx)("div",{children:(0,f.jsx)(E,{})})]})})}),(0,f.jsx)(o.Z,{anchorOrigin:{vertical:"top",horizontal:"right"},open:Boolean(x),autoHideDuration:5e3,onClose:z,children:(0,f.jsx)(S,{onClose:z,severity:"success",sx:{width:"100%"},children:x})})]})}}},function(a){a.O(0,[0,774,888,179],function(){var b;return a(a.s=48312)}),_N_E=a.O()}])