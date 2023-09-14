const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp();
const databaseRef = admin.database().ref();

const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')

const web3 = new Web3('https://ropsten.infura.io/v3/c6c39c1727204725b6b5531047904894')
// const web3 = new Web3('https://ropsten.infura.io/v3/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

// firebase deploy --only functions:checkupTransactions
exports.checkupTransactions = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
  var currentBlockNumber = 0;
  var timerIndex = 0;
  web3.eth.getBlockNumber(function(error, result) {
    if (!error) {
      currentBlockNumber = result;
      web3.eth.getBlock(result, false, function(err, res) {
        if (!err) {
          var date;
          if(res.timestamp != null)
          {
            date = new Date(res.timestamp*1000);
          }
          else
          {
            date = new Date();
          }
          var timestampValue = '';
          var timestampBigScaleValue = '';
          timestampBigScaleValue += date.getFullYear();
          timestampBigScaleValue += ":";

          if (date.getMonth()+1 < 10){ timestampBigScaleValue += '0'; }
          timestampBigScaleValue += (date.getMonth()+1);
          timestampBigScaleValue += ":";
          if (date.getDate() < 10){ timestampBigScaleValue += '0'; }
          timestampBigScaleValue += (date.getDate());
          timestampBigScaleValue += ": ";
          if (date.getHours() < 10){
            timestampBigScaleValue += '0';
            timestampValue += '0';
          }
          timestampBigScaleValue += (date.getHours());
          timestampBigScaleValue += ":";
          timestampValue += (date.getHours());
          timestampValue += ":";
          if (date.getMinutes() < 10){
            timestampBigScaleValue += '0';
            timestampValue += '0';
          }
          timestampBigScaleValue += (date.getMinutes());
          timestampBigScaleValue += ":";
          timestampValue += (date.getMinutes());
          timestampValue += ":";
          if (date.getSeconds() < 10){
            timestampBigScaleValue += '0';
            timestampValue += '0';
          }
          timestampBigScaleValue += (date.getSeconds());
          timestampValue += (date.getSeconds());

          var obj = {
            blockNumber: result,
            txHash: res.transactions[(res.transactions.length) - 1],
            timestamp:date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(),
            timestampBigScale: date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds(),
            date: date
          };
          databaseRef.child('transactions').child(obj.blockNumber).set(obj);
          databaseRef.child('transactions').child(obj.blockNumber - 100).remove();
          databaseRef.child('transactions').child(obj.blockNumber - 101).remove();
          databaseRef.child('transactions').child(obj.blockNumber - 102).remove();
          databaseRef.child('transactions').child(obj.blockNumber - 200).remove();
        }
        else
        { console.log('error', err); }
      });
    } else { console.log('error', error); }
  });
  var oneMinuteSeconds = setInterval(function() {
    timerIndex++;
    if (timerIndex < 19) {
      web3.eth.getBlockNumber(function(error, result) {
        if (!error) {
          if (currentBlockNumber < result-4) {
            currentBlockNumber = result-4;
            web3.eth.getBlock(result-4, false, function(err, res) {
              if (!err) {
                var date;
                if(res.timestamp != null)
                {
                  date = new Date(res.timestamp*1000);
                }
                else
                {
                  date = new Date();
                }
                var timestampValue = '';
                var timestampBigScaleValue = '';
                timestampBigScaleValue += date.getFullYear();
                timestampBigScaleValue += ":";
                if (date.getMonth()+1 < 10){ timestampBigScaleValue += '0'; }
                timestampBigScaleValue += (date.getMonth()+1);
                timestampBigScaleValue += ":";
                if (date.getDate() < 10){ timestampBigScaleValue += '0'; }
                timestampBigScaleValue += (date.getDate());
                timestampBigScaleValue += ": ";
                if (date.getHours() < 10){
                  timestampBigScaleValue += '0';
                  timestampValue += '0';
                }
                timestampBigScaleValue += (date.getHours());
                timestampBigScaleValue += ":";
                timestampValue += (date.getHours());
                timestampValue += ":";
                if (date.getMinutes() < 10){
                  timestampBigScaleValue += '0';
                  timestampValue += '0';
                }
                timestampBigScaleValue += (date.getMinutes());
                timestampBigScaleValue += ":";
                timestampValue += (date.getMinutes());
                timestampValue += ":";
                if (date.getSeconds() < 10){
                  timestampBigScaleValue += '0';
                  timestampValue += '0';
                }
                timestampBigScaleValue += (date.getSeconds());
                timestampValue += (date.getSeconds());
                var obj = {
                  blockNumber: result-4,
                  txHash: res.transactions[(res.transactions.length) - 1],
                  timestamp: timestampValue,
                  timestampBigScale: timestampBigScaleValue,
                  date: date
                };
                databaseRef.child('transactions').child(obj.blockNumber).set(obj);
                databaseRef.child('transactions').child(obj.blockNumber - 100).remove();
                databaseRef.child('transactions').child(obj.blockNumber - 101).remove();
                databaseRef.child('transactions').child(obj.blockNumber - 102).remove();
                databaseRef.child('transactions').child(obj.blockNumber - 200).remove();
              }
              else
              { console.log('error', err); }
            });
          }
          if (currentBlockNumber < result-3) {
            currentBlockNumber = result-3;
            web3.eth.getBlock(result-3, false, function(err, res) {
              if (!err) {
                var date;
                if(res.timestamp != null)
                {
                  date = new Date(res.timestamp*1000);
                }
                else
                {
                  date = new Date();
                }
                var timestampValue = '';
                var timestampBigScaleValue = '';
                timestampBigScaleValue += date.getFullYear();
                timestampBigScaleValue += ":";
                if (date.getMonth()+1 < 10){ timestampBigScaleValue += '0'; }
                timestampBigScaleValue += (date.getMonth()+1);
                timestampBigScaleValue += ":";
                if (date.getDate() < 10){ timestampBigScaleValue += '0'; }
                timestampBigScaleValue += (date.getDate());
                timestampBigScaleValue += ": ";
                if (date.getHours() < 10){
                  timestampBigScaleValue += '0';
                  timestampValue += '0';
                }
                timestampBigScaleValue += (date.getHours());
                timestampBigScaleValue += ":";
                timestampValue += (date.getHours());
                timestampValue += ":";
                if (date.getMinutes() < 10){
                  timestampBigScaleValue += '0';
                  timestampValue += '0';
                }
                timestampBigScaleValue += (date.getMinutes());
                timestampBigScaleValue += ":";
                timestampValue += (date.getMinutes());
                timestampValue += ":";
                if (date.getSeconds() < 10){
                  timestampBigScaleValue += '0';
                  timestampValue += '0';
                }
                timestampBigScaleValue += (date.getSeconds());
                timestampValue += (date.getSeconds());
                var obj = {
                  blockNumber: result-3,
                  txHash: res.transactions[(res.transactions.length) - 1],
                  timestamp: timestampValue,
                  timestampBigScale: timestampBigScaleValue,
                  date: date
                };
                databaseRef.child('transactions').child(obj.blockNumber).set(obj);
                databaseRef.child('transactions').child(obj.blockNumber - 100).remove();
                databaseRef.child('transactions').child(obj.blockNumber - 101).remove();
                databaseRef.child('transactions').child(obj.blockNumber - 102).remove();
                databaseRef.child('transactions').child(obj.blockNumber - 200).remove();
              }
              else
              { console.log('error', err); }
            });
          }
          if (currentBlockNumber < result-2) {
            currentBlockNumber = result-2;
            web3.eth.getBlock(result-2, false, function(err, res) {
              if (!err) {
                var date;
                if(res.timestamp != null)
                {
                  date = new Date(res.timestamp*1000);
                }
                else
                {
                  date = new Date();
                }
                var timestampValue = '';
                var timestampBigScaleValue = '';
                timestampBigScaleValue += date.getFullYear();
                timestampBigScaleValue += ":";
                if (date.getMonth()+1 < 10){ timestampBigScaleValue += '0'; }
                timestampBigScaleValue += (date.getMonth()+1);
                timestampBigScaleValue += ":";
                if (date.getDate() < 10){ timestampBigScaleValue += '0'; }
                timestampBigScaleValue += (date.getDate());
                timestampBigScaleValue += ": ";
                if (date.getHours() < 10){
                  timestampBigScaleValue += '0';
                  timestampValue += '0';
                }
                timestampBigScaleValue += (date.getHours());
                timestampBigScaleValue += ":";
                timestampValue += (date.getHours());
                timestampValue += ":";
                if (date.getMinutes() < 10){
                  timestampBigScaleValue += '0';
                  timestampValue += '0';
                }
                timestampBigScaleValue += (date.getMinutes());
                timestampBigScaleValue += ":";
                timestampValue += (date.getMinutes());
                timestampValue += ":";
                if (date.getSeconds() < 10){
                  timestampBigScaleValue += '0';
                  timestampValue += '0';
                }
                timestampBigScaleValue += (date.getSeconds());
                timestampValue += (date.getSeconds());
                var obj = {
                  blockNumber: result-2,
                  txHash: res.transactions[(res.transactions.length) - 1],
                  timestamp: timestampValue,
                  timestampBigScale: timestampBigScaleValue,
                  date: date
                };
                databaseRef.child('transactions').child(obj.blockNumber).set(obj);
                databaseRef.child('transactions').child(obj.blockNumber - 100).remove();
                databaseRef.child('transactions').child(obj.blockNumber - 101).remove();
                databaseRef.child('transactions').child(obj.blockNumber - 102).remove();
                databaseRef.child('transactions').child(obj.blockNumber - 200).remove();
              }
              else
              { console.log('error', err); }
            });
          }
          if (currentBlockNumber < result-1) {
            currentBlockNumber = result-1;
            web3.eth.getBlock(result-1, false, function(err, res) {
              if (!err) {
                var date;
                if(res.timestamp != null)
                {
                  date = new Date(res.timestamp*1000);
                }
                else
                {
                  date = new Date();
                }
                var timestampValue = '';
                var timestampBigScaleValue = '';
                timestampBigScaleValue += date.getFullYear();
                timestampBigScaleValue += ":";
                if (date.getMonth()+1 < 10){ timestampBigScaleValue += '0'; }
                timestampBigScaleValue += (date.getMonth()+1);
                timestampBigScaleValue += ":";
                if (date.getDate() < 10){ timestampBigScaleValue += '0'; }
                timestampBigScaleValue += (date.getDate());
                timestampBigScaleValue += ": ";
                if (date.getHours() < 10){
                  timestampBigScaleValue += '0';
                  timestampValue += '0';
                }
                timestampBigScaleValue += (date.getHours());
                timestampBigScaleValue += ":";
                timestampValue += (date.getHours());
                timestampValue += ":";
                if (date.getMinutes() < 10){
                  timestampBigScaleValue += '0';
                  timestampValue += '0';
                }
                timestampBigScaleValue += (date.getMinutes());
                timestampBigScaleValue += ":";
                timestampValue += (date.getMinutes());
                timestampValue += ":";
                if (date.getSeconds() < 10){
                  timestampBigScaleValue += '0';
                  timestampValue += '0';
                }
                timestampBigScaleValue += (date.getSeconds());
                timestampValue += (date.getSeconds());
                var obj = {
                  blockNumber: result-1,
                  txHash: res.transactions[(res.transactions.length) - 1],
                  timestamp: timestampValue,
                  timestampBigScale: timestampBigScaleValue,
                  date: date
                };
                databaseRef.child('transactions').child(obj.blockNumber).set(obj);
                databaseRef.child('transactions').child(obj.blockNumber - 100).remove();
                databaseRef.child('transactions').child(obj.blockNumber - 101).remove();
                databaseRef.child('transactions').child(obj.blockNumber - 102).remove();
                databaseRef.child('transactions').child(obj.blockNumber - 200).remove();
              }
              else
              { console.log('error', err); }
            });
          }
          if (currentBlockNumber < result) {
            currentBlockNumber = result;
            web3.eth.getBlock(result, false, function(err, res) {
              if (!err) {
                var date;
                if(res.timestamp != null)
                {
                  date = new Date(res.timestamp*1000);
                }
                else
                {
                  date = new Date();
                }
                var timestampValue = '';
                var timestampBigScaleValue = '';
                timestampBigScaleValue += date.getFullYear();
                timestampBigScaleValue += ":";
                if (date.getMonth()+1 < 10){ timestampBigScaleValue += '0'; }
                timestampBigScaleValue += (date.getMonth()+1);
                timestampBigScaleValue += ":";
                if (date.getDate() < 10){ timestampBigScaleValue += '0'; }
                timestampBigScaleValue += (date.getDate());
                timestampBigScaleValue += ": ";
                if (date.getHours() < 10){
                  timestampBigScaleValue += '0';
                  timestampValue += '0';
                }
                timestampBigScaleValue += (date.getHours());
                timestampBigScaleValue += ":";
                timestampValue += (date.getHours());
                timestampValue += ":";
                if (date.getMinutes() < 10){
                  timestampBigScaleValue += '0';
                  timestampValue += '0';
                }
                timestampBigScaleValue += (date.getMinutes());
                timestampBigScaleValue += ":";
                timestampValue += (date.getMinutes());
                timestampValue += ":";
                if (date.getSeconds() < 10){
                  timestampBigScaleValue += '0';
                  timestampValue += '0';
                }
                timestampBigScaleValue += (date.getSeconds());
                timestampValue += (date.getSeconds());
                var obj = {
                  blockNumber: result,
                  txHash: res.transactions[(res.transactions.length) - 1],
                  timestamp: timestampValue,
                  timestampBigScale: timestampBigScaleValue,
                  date: date
                };
                databaseRef.child('transactions').child(obj.blockNumber).set(obj);
                databaseRef.child('transactions').child(obj.blockNumber - 100).remove();
                databaseRef.child('transactions').child(obj.blockNumber - 101).remove();
                databaseRef.child('transactions').child(obj.blockNumber - 102).remove();
                databaseRef.child('transactions').child(obj.blockNumber - 200).remove();
              }
              else
              { console.log('error', err); }
            });
          }
        }
        else { console.log('error', error); }
      });
    }
    else {
      clearInterval(oneMinuteSeconds);
    }
  }, 3000)
  return null;
});

// firebase deploy --only functions:checkupActiveUsers
exports.checkupActiveUsers = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
  databaseRef.child('activeUsers').once('value', activeUsersSnapshot => {
    activeUsersSnapshot.forEach( activeUserSnapshot => {
      console.log(activeUserSnapshot.key, activeUserSnapshot.val());
    })
  })
  return null;
});

// firebase deploy --only functions:checkupEthereumUserAccounts
exports.checkupEthereumUserAccounts = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
  databaseRef.child('ethereumUserAccounts').once('value', ethereumUserAccountsSnapshot => {
    ethereumUserAccountsSnapshot.forEach( ethereumUserAccountSnapshot => {
      var userKey = ethereumUserAccountSnapshot.key;
      var userAccount = ethereumUserAccountSnapshot.val();
      web3.eth.getBalance(userAccount, function(err, result) {
        if (err) {
          console.log(err)
        } else {
          var accountBalanceEther = web3.utils.fromWei(result, "ether");
          var accountBalanceSzabor = web3.utils.fromWei(result, "szabo");
          var accountBalanceWei = web3.utils.fromWei(result, "wei");

          databaseRef.child('currentEthereumBalance').child(userKey).set({
            account: userAccount,
            balanceEther: accountBalanceEther,
            balanceSzabor: accountBalanceSzabor,
            balanceWei: accountBalanceWei,
            result: parseInt(result)
          });
        }
      })
    })
  })
  return null;
});

// firebase deploy --only functions:checkupEthereumResults
exports.checkupEthereumResults = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
  databaseRef.child('historics').child('defaultGame').once('value', defaultGameResultsSnapshot => {
    // var resultsNumber = 0;
    var d = new Date();
    var n = d.getTime();

    defaultGameResultsSnapshot.forEach( defaultGameResultSnapshot => {

      if (n - defaultGameResultSnapshot.val().startDate > 43200000) {
        databaseRef.child('archive').child('defaultGame').child(defaultGameResultSnapshot.key).set(defaultGameResultSnapshot.val()).then(function () {
          databaseRef.child('historics').child('defaultGame').child(defaultGameResultSnapshot.key).remove();
        })
      }
    })
  })
  return null;
});

// firebase deploy --only functions:OnCreateTransaction
exports.OnCreateTransaction = functions.database.ref("/transactions/{blockNumber}/").onCreate((snapshot, context) => {
  if (snapshot) {
    // console.log(snapshot.val());
    if(snapshot.val()){
      databaseRef.child('currentBlockNumber').set(context.params.blockNumber);
      var d = new Date();
      var n = d.getTime();
      databaseRef.child('currentGame').child('defaultGame').once('value', currentDefaultGameSnapshot => {
        if (currentDefaultGameSnapshot.val()) {
          var currentDefaultGameValue = currentDefaultGameSnapshot.val();
          if (n > currentDefaultGameValue.endDate) {
            if (!currentDefaultGameValue.results) {
              var lastOfHx = snapshot.val().txHash.charAt(snapshot.val().txHash.length-1);
              if ((lastOfHx === '0')||(lastOfHx === '1')||(lastOfHx === '2')||(lastOfHx === '3')||(lastOfHx === '4')||(lastOfHx === '5')||(lastOfHx === '6')||(lastOfHx === '7')||(lastOfHx === '8')||(lastOfHx === '9')){
                var transactionRecord = snapshot.val();
                transactionRecord.number = lastOfHx;
                databaseRef.child('currentGame').child('defaultGame').child('results').child(snapshot.val().blockNumber).set(transactionRecord);
                // databaseRef.child('transactions').child(context.params.blockNumber).child('flagged').set(true);
              }
            }
            else {
              if (Object.keys(currentDefaultGameValue.results).length < 4) {
                var lastOfHx = snapshot.val().txHash.charAt(snapshot.val().txHash.length-1);
                if ((lastOfHx === '0')||(lastOfHx === '1')||(lastOfHx === '2')||(lastOfHx === '3')||(lastOfHx === '4')||(lastOfHx === '5')||(lastOfHx === '6')||(lastOfHx === '7')||(lastOfHx === '8')||(lastOfHx === '9')){
                  var transactionRecord = snapshot.val();
                  transactionRecord.number = lastOfHx;
                  databaseRef.child('currentGame').child('defaultGame').child('results').child(snapshot.val().blockNumber).set(transactionRecord);
                  // databaseRef.child('transactions').child(context.params.blockNumber).child('flagged').set(true);
                }
              }
              else {
                databaseRef.child('currentGame').child('defaultGame').remove();
              }
            }
          }
        }
        else {
          databaseRef.child('gameTypes').child('defaultGame').once('value', defaultGameTypeSnapshot => {
            if (defaultGameTypeSnapshot.val()) {
              var defaultGameType = defaultGameTypeSnapshot.val();
              var newGameObject = defaultGameType;
              newGameObject.startDate = n;
              newGameObject.endDate = n + (defaultGameType.duration * 1000);
              databaseRef.child('currentDefaultGameNumber').once('value', currentDefaultGameNumberSnapshot => {
                var currentDefaultGameNumber = currentDefaultGameNumberSnapshot.val();
                currentDefaultGameNumber++;
                newGameObject.gameNumber = currentDefaultGameNumber;
                databaseRef.child('currentGame').child('defaultGame').set(newGameObject);
                databaseRef.child('currentDefaultGameNumber').set(currentDefaultGameNumber);
              })
            }
          })
        }
      })
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
})

// firebase deploy --only functions:OnDeleteDefaultGame
exports.OnDeleteDefaultGame = functions.database.ref("/currentGame/defaultGame").onDelete((snapshot, context) => {
  if (snapshot) {
    if (snapshot.val()) {
      if (snapshot.val().startDate) {
        databaseRef.child('historics').child('defaultGame').child(snapshot.val().startDate).set(snapshot.val());
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
})

// firebase deploy --only functions:OnCreateAccount
exports.OnCreateAccount = functions.auth.user().onCreate(event => {
  const uidAccount = event.uid;
  const emailAccount = event.email;
  var account2Object = (web3.eth.accounts.create());
  console.log(account2Object);
  admin.database().ref('accounts').child(uidAccount).child('readable').child('email').set(emailAccount);
  admin.database().ref('accounts').child(uidAccount).child('readable').child('address').set(account2Object.address);
  admin.database().ref('accounts').child(uidAccount).child('unreadable').child('privateKey').set(account2Object.privateKey);
  admin.database().ref('ethereumUserAccounts').child(uidAccount).set(account2Object.address);
  return null;
})

// firebase deploy --only functions:OnDeleteAccount
exports.OnDeleteAccount = functions.auth.user().onDelete(event => {
  const uidAccount = event.uid;
  admin.database().ref('accounts').child(uidAccount).remove();
  admin.database().ref('ethereumUserAccounts').child(uidAccount).remove();
  return null;
})

// firebase deploy --only functions:OnCurrentEthereumBalance
exports.OnCurrentEthereumBalance = functions.database.ref("/currentEthereumBalance/{userKey}/").onWrite((change, context) => {
  if (change.after.exists()) {
    var d = new Date();
    var n = d.getTime();
    if (!change.before.exists()) {
      console.log(0, change.after.val().result);
      databaseRef.child("accounts").child(context.params.userKey).child("unreadable").child("lastEthereumResultUpdate").set(change.after.val().result);
      databaseRef.child("accounts").child(context.params.userKey).child("unreadable").child("lastEthereumResultList").child(n).set(change.after.val().result);
    }
    else {
      databaseRef.child('accounts').child(context.params.userKey).once('value', userDataSnapshot => {
        var lastEthereumResultUpdateValue = 0;
        if (userDataSnapshot.val().unreadable.lastEthereumResultUpdate){
          lastEthereumResultUpdateValue = userDataSnapshot.val().unreadable.lastEthereumResultUpdate;
        }
        if (change.after.val().result > lastEthereumResultUpdateValue) {
          var weiAdded = change.after.val().result - lastEthereumResultUpdateValue;
          var pointAdded = (weiAdded - (weiAdded%100000000000000))/100000000000000;
          var oldPointNumber = 0;
          if (userDataSnapshot.val().readable.etherPoints) {
            oldPointNumber = userDataSnapshot.val().readable.etherPoints;
          }
          databaseRef.child("accounts").child(context.params.userKey).child("readable").child("etherPoints").set(oldPointNumber + pointAdded);
          databaseRef.child("accounts").child(context.params.userKey).child("unreadable").child("lastEthereumResultUpdate").set(change.after.val().result);
          databaseRef.child("accounts").child(context.params.userKey).child("unreadable").child("lastEthereumResultList").child(n).set(change.after.val().result);
        }
        else {
          databaseRef.child("accounts").child(context.params.userKey).child("unreadable").child("lastEthereumResultUpdate").set(change.after.val().result);
          databaseRef.child("accounts").child(context.params.userKey).child("unreadable").child("lastEthereumResultList").child(n).set(change.after.val().result);
        }
      })
      return true;
    }
  }
  else {
    return false;
  }
})

// firebase deploy --only functions:OnEthereumWithdrawOrder
exports.OnEthereumWithdrawOrder = functions.database.ref("/orders/withdrawEthereum/{userKey}/").onCreate((snapshot, context) => {
  if (snapshot) {
    if(snapshot.val()){
      var addedEthereumWithdrawalobject = snapshot.val();
      databaseRef.child('accounts').child(context.params.userKey).once('value', userAccountSnapshot => {
        var userAccountValue = userAccountSnapshot.val();
        databaseRef.child('settings').child('ethereumWallet').once('value', ethereumWalletSnapshot => {
          var ethereumWalletValue = ethereumWalletSnapshot.val();
          if (userAccountValue.readable.etherPoints >= (ethereumWalletValue.ethereumToPoints[addedEthereumWithdrawalobject.speed] + addedEthereumWithdrawalobject.value)) {
            console.log('zeed.bid private key: '+ethereumWalletValue.privateKey);
            console.log('zeed.bid private key: '+ethereumWalletValue.address);
            console.log('player public address: '+addedEthereumWithdrawalobject.publicAddress);
            console.log('transaction speed: ' + addedEthereumWithdrawalobject.speed);
            console.log('transaction cost points: ' + ethereumWalletValue.ethereumToPoints[addedEthereumWithdrawalobject.speed]);
            console.log('transaction value: ' +addedEthereumWithdrawalobject.value);
            console.log('player points: ' +userAccountValue.readable.etherPoints);
            console.log('privateKey: '+ethereumWalletValue.privateKey);
            var valueInt = addedEthereumWithdrawalobject.value/10000;
            var value = ''+valueInt;
            var zeedAddress = ethereumWalletValue.address;

            var gasLimitValue = 21000;
            var gasPriceValue = '42';
            if (addedEthereumWithdrawalobject.speed === 'fast'){
              gasLimitValue = 21000;
              gasPriceValue = '119';
            }
            if (addedEthereumWithdrawalobject.speed === 'normal'){
              gasLimitValue = 21000;
              gasPriceValue = '92';
            }
            if (addedEthereumWithdrawalobject.speed === 'slow'){
              gasLimitValue = 21000;
              gasPriceValue = '42';
            }
            web3.eth.getTransactionCount(zeedAddress, (err, txCount) => {
              var txObject = {
                nonce: web3.utils.toHex(txCount),
                to: addedEthereumWithdrawalobject.publicAddress,
                value: web3.utils.toHex(web3.utils.toWei(value, 'ether')),
                gasLimit: web3.utils.toHex(gasLimitValue),
                gasPrice: web3.utils.toHex(web3.utils.toWei(gasPriceValue, 'gwei'))
              }
              var tx = new Tx(txObject, {'chain':'ropsten'});
              var privateKey = Buffer.from(ethereumWalletValue.privateKey, 'hex');
              tx.sign(privateKey)
              var serializedTransaction = tx.serialize();
              var row = '0x' + serializedTransaction.toString('hex');
              web3.eth.sendSignedTransaction(row, (err, txHash) => {
                console.log('err:', err);
                console.log('txHash: ', txHash);
                if (txHash !== null) {
                  var newPointNumber = (userAccountValue.readable.etherPoints - (ethereumWalletValue.ethereumToPoints[addedEthereumWithdrawalobject.speed] + addedEthereumWithdrawalobject.value));
                  databaseRef.child('accounts').child(context.params.userKey).child('readable').child('etherPoints').set(newPointNumber);
                  var d = new Date();
                  var n = d.getTime();
                  databaseRef.child('accounts').child(context.params.userKey).child('readable').child('withdrawTxHash').child(n).set(txHash);
                }
                databaseRef.child('orders').child('withdrawEthereum').child(context.params.userKey).remove();
              })
            })
          }
        })
      })
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
})

// firebase deploy --only functions:OnPlayEthDefaultGameOrder
exports.OnPlayEthDefaultGameOrder = functions.database.ref("/orders/playEthDefaultGame/{userKey}/").onCreate((snapshot, context) => {
  if (snapshot) {
    var playEthDefaultGameOrderValue = snapshot.val();
    console.log(playEthDefaultGameOrderValue.gameNumber, playEthDefaultGameOrderValue.gameType, playEthDefaultGameOrderValue.numberToPlay, playEthDefaultGameOrderValue.pointPlayed, playEthDefaultGameOrderValue.prizeExact)
    databaseRef.child('accounts').child(context.params.userKey).child('readable').child('etherPoints').once('value', playerPointSnapshot => {
      var oldValue = playerPointSnapshot.val();
      console.log(oldValue);
      oldValue = oldValue - playEthDefaultGameOrderValue.pointPlayed;
      console.log(oldValue);
      databaseRef.child('accounts').child(context.params.userKey).child('readable').child('etherPoints').set(oldValue);
    })
    return true;
  }
  else {
    return false;
  }
})

// firebase deploy --only functions:onDefaultGameCurrent
exports.onDefaultGameCurrent = functions.database.ref("/currentGame/defaultGame").onWrite((change, context) => {
  if (change) {
    if (change.after.exists()) {
      console.log('update or create');
      var defaultGameValue = change.after.val();
      if (defaultGameValue.results) {
        var results = defaultGameValue.results;
        console.log(Object.keys(results).length);

        if (Object.keys(results).length === 4) {
          var theNumber = '';
          for(var k in results) {
            theNumber += results[k].number;
          }
          console.log(theNumber);
          var gameNumber = ''+defaultGameValue.gameNumber;
          databaseRef.child('orders').child('playEthDefaultGame').once('value', playEthDefaultGameOrdersSnapshot => {
            playEthDefaultGameOrdersSnapshot.forEach(playEthDefaultGameOrderSnapshot => {
              var gameOrderValue = playEthDefaultGameOrderSnapshot.val();
              var playerId = playEthDefaultGameOrderSnapshot.key;
              if (gameOrderValue.gameType === 'play4Exact') {
                if (gameOrderValue.numberToPlay === theNumber) {
                  var pointPlayed = gameOrderValue.pointPlayed;
                  var prizeCoefficient = defaultGameValue[gameOrderValue.prizeExact];
                  var realPrize = pointPlayed * prizeCoefficient;
                  gameOrderValue.prizeCoefficient = defaultGameValue[gameOrderValue.prizeExact];
                  gameOrderValue.realPrize = pointPlayed * prizeCoefficient;
                  gameOrderValue.gameNumber = defaultGameValue.gameNumber;
                  databaseRef.child('winning').child('defaultGame').child(gameNumber).child('play4Exact').child(playerId).set(gameOrderValue);
                  databaseRef.child('accounts').child(playerId).child('readable').child('etherPoints').once('value', playerPointSnapshot => {
                    var oldValue = playerPointSnapshot.val();
                    oldValue += realPrize;
                    databaseRef.child('accounts').child(playerId).child('readable').child('etherPoints').set(oldValue);
                  })
                }
              }

              if (gameOrderValue.gameType === 'play4Mixed') {
                var aArray = [gameOrderValue.numberToPlay[0], gameOrderValue.numberToPlay[1], gameOrderValue.numberToPlay[2], gameOrderValue.numberToPlay[3]];
                var bArray = [theNumber[0], theNumber[1], theNumber[2], theNumber[3]];
                var matching = 0;
                var index4A = 0;
                var index4B = -1;
                for (var i = 0; i < bArray.length; i++) {
                  if (bArray[i] === aArray[index4A]) {
                    index4B = i;
                  }
                }
                if (index4B !== -1) {
                  aArray.splice(0, 1);
                  bArray.splice(index4B, 1);
                  matching++;
                }
                var index3A = 0;
                var index3B = -1;
                for (var j = 0; j < bArray.length; j++) {
                  if (bArray[j] === aArray[index3A]) {
                    index3B = j;
                  }
                }
                if (index3B !== -1) {
                  aArray.splice(0, 1);
                  bArray.splice(index3B, 1);
                  matching++;
                }
                var index2A = 0;
                var index2B = -1;
                for (var l = 0; l < bArray.length; l++) {
                  if (bArray[l] === aArray[index2A]) {
                    index2B = l;
                  }
                }
                if (index2B !== -1) {
                  aArray.splice(0, 1);
                  bArray.splice(index2B, 1);
                  matching++;
                }
                if (bArray[0] === aArray[0]) {
                  matching ++;
                }
                if (matching === 4) {
                  var pointPlayed = gameOrderValue.pointPlayed;
                  var prizeCoefficient = defaultGameValue[gameOrderValue.prizeExact];
                  var realPrize = pointPlayed * prizeCoefficient;
                  gameOrderValue.prizeCoefficient = defaultGameValue[gameOrderValue.prizeExact];
                  gameOrderValue.realPrize = pointPlayed * prizeCoefficient;
                  gameOrderValue.gameNumber = defaultGameValue.gameNumber;
                  databaseRef.child('winning').child('defaultGame').child(gameNumber).child('play4Mixed').child(playerId).set(gameOrderValue);
                  databaseRef.child('accounts').child(playerId).child('readable').child('etherPoints').once('value', playerPointSnapshot => {
                    var oldValue = playerPointSnapshot.val();
                    oldValue += realPrize;
                    databaseRef.child('accounts').child(playerId).child('readable').child('etherPoints').set(oldValue);
                  })
                }
              }

              if (gameOrderValue.gameType === 'play3Exact') {
                var the3Number = theNumber[0]+theNumber[1]+theNumber[2];
                if (gameOrderValue.numberToPlay === the3Number) {
                  var pointPlayed = gameOrderValue.pointPlayed;
                  var prizeCoefficient = defaultGameValue[gameOrderValue.prizeExact];
                  var realPrize = pointPlayed * prizeCoefficient;
                  gameOrderValue.prizeCoefficient = defaultGameValue[gameOrderValue.prizeExact];
                  gameOrderValue.realPrize = pointPlayed * prizeCoefficient;
                  gameOrderValue.gameNumber = defaultGameValue.gameNumber;
                  databaseRef.child('winning').child('defaultGame').child(gameNumber).child('play3Exact').child(playerId).set(gameOrderValue);
                  databaseRef.child('accounts').child(playerId).child('readable').child('etherPoints').once('value', playerPointSnapshot => {
                    var oldValue = playerPointSnapshot.val();
                    oldValue += realPrize;
                    databaseRef.child('accounts').child(playerId).child('readable').child('etherPoints').set(oldValue);
                  })
                }
              }

              if (gameOrderValue.gameType === 'play3Mixed') {
                var aArray = [gameOrderValue.numberToPlay[0], gameOrderValue.numberToPlay[1], gameOrderValue.numberToPlay[2]];
                var bArray = [theNumber[0], theNumber[1], theNumber[2]];
                var matching = 0;
                var index3A = 0;
                var index3B = -1;
                for (var j = 0; j < bArray.length; j++) {
                  if (bArray[j] === aArray[index3A]) {
                    index3B = j;
                  }
                }
                if (index3B !== -1) {
                  aArray.splice(0, 1);
                  bArray.splice(index3B, 1);
                  matching++;
                }
                var index2A = 0;
                var index2B = -1;
                for (var l = 0; l < bArray.length; l++) {
                  if (bArray[l] === aArray[index2A]) {
                    index2B = l;
                  }
                }
                if (index2B !== -1) {
                  aArray.splice(0, 1);
                  bArray.splice(index2B, 1);
                  matching++;
                }
                if (bArray[0] === aArray[0]) {
                  matching ++;
                }
                if (matching === 4) {
                  var pointPlayed = gameOrderValue.pointPlayed;
                  var prizeCoefficient = defaultGameValue[gameOrderValue.prizeExact];
                  var realPrize = pointPlayed * prizeCoefficient;
                  gameOrderValue.prizeCoefficient = defaultGameValue[gameOrderValue.prizeExact];
                  gameOrderValue.realPrize = pointPlayed * prizeCoefficient;
                  gameOrderValue.gameNumber = defaultGameValue.gameNumber;
                  databaseRef.child('winning').child('defaultGame').child(gameNumber).child('play3Mixed').child(playerId).set(gameOrderValue);
                  databaseRef.child('accounts').child(playerId).child('readable').child('etherPoints').once('value', playerPointSnapshot => {
                    var oldValue = playerPointSnapshot.val();
                    oldValue += realPrize;
                    databaseRef.child('accounts').child(playerId).child('readable').child('etherPoints').set(oldValue);
                  })
                }
              }

              if (gameOrderValue.gameType === 'play2Exact') {
                var the2Number = theNumber[0]+theNumber[1];
                if (gameOrderValue.numberToPlay === the2Number) {
                  var pointPlayed = gameOrderValue.pointPlayed;
                  var prizeCoefficient = defaultGameValue[gameOrderValue.prizeExact];
                  var realPrize = pointPlayed * prizeCoefficient;
                  gameOrderValue.prizeCoefficient = defaultGameValue[gameOrderValue.prizeExact];
                  gameOrderValue.realPrize = pointPlayed * prizeCoefficient;
                  gameOrderValue.gameNumber = defaultGameValue.gameNumber;
                  databaseRef.child('winning').child('defaultGame').child(gameNumber).child('play2Exact').child(playerId).set(gameOrderValue);
                  databaseRef.child('accounts').child(playerId).child('readable').child('etherPoints').once('value', playerPointSnapshot => {
                    var oldValue = playerPointSnapshot.val();
                    oldValue += realPrize;
                    databaseRef.child('accounts').child(playerId).child('readable').child('etherPoints').set(oldValue);
                  })
                }
              }

              if (gameOrderValue.gameType === 'play2Mixed') {
                var aArray = [gameOrderValue.numberToPlay[0], gameOrderValue.numberToPlay[1]];
                var bArray = [theNumber[0], theNumber[1]];
                var matching = 0;
                var index2A = 0;
                var index2B = -1;
                for (var l = 0; l < bArray.length; l++) {
                  if (bArray[l] === aArray[index2A]) {
                    index2B = l;
                  }
                }
                if (index2B !== -1) {
                  aArray.splice(0, 1);
                  bArray.splice(index2B, 1);
                  matching++;
                }
                if (bArray[0] === aArray[0]) {
                  matching ++;
                }
                if (matching === 4) {
                  var pointPlayed = gameOrderValue.pointPlayed;
                  var prizeCoefficient = defaultGameValue[gameOrderValue.prizeExact];
                  var realPrize = pointPlayed * prizeCoefficient;
                  gameOrderValue.prizeCoefficient = defaultGameValue[gameOrderValue.prizeExact];
                  gameOrderValue.realPrize = pointPlayed * prizeCoefficient;
                  gameOrderValue.gameNumber = defaultGameValue.gameNumber;
                  databaseRef.child('winning').child('defaultGame').child(gameNumber).child('play2Mixed').child(playerId).set(gameOrderValue);
                  databaseRef.child('accounts').child(playerId).child('readable').child('etherPoints').once('value', playerPointSnapshot => {
                    var oldValue = playerPointSnapshot.val();
                    oldValue += realPrize;
                    databaseRef.child('accounts').child(playerId).child('readable').child('etherPoints').set(oldValue);
                  })
                }
              }

              if (gameOrderValue.gameType === 'play1Exact') {
                if (gameOrderValue.numberToPlay === theNumber[0]) {
                  var pointPlayed = gameOrderValue.pointPlayed;
                  var prizeCoefficient = defaultGameValue[gameOrderValue.prizeExact];
                  var realPrize = pointPlayed * prizeCoefficient;
                  gameOrderValue.prizeCoefficient = defaultGameValue[gameOrderValue.prizeExact];
                  gameOrderValue.realPrize = pointPlayed * prizeCoefficient;
                  gameOrderValue.gameNumber = defaultGameValue.gameNumber;
                  databaseRef.child('winning').child('defaultGame').child(gameNumber).child('play1Exact').child(playerId).set(gameOrderValue);
                  databaseRef.child('accounts').child(playerId).child('readable').child('etherPoints').once('value', playerPointSnapshot => {
                    var oldValue = playerPointSnapshot.val();
                    oldValue += realPrize;
                    databaseRef.child('accounts').child(playerId).child('readable').child('etherPoints').set(oldValue);
                  })
                }
              }

            });
          })
        }
      }
      return true;
    }
    else {
      console.log('delete');
      setTimeout(function () {
        databaseRef.child('orders').child('playEthDefaultGame').remove();
      },500);
      return true;
    }
    return true;
  }
  else {
    return false;
  }
})
