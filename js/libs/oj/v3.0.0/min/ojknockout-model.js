/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","knockout","ojs/ojmodel"],function(a,g){a.vb=function(){};o_("KnockoutUtils",a.vb,a);a.vb.o3="oj._internalObj";a.vb.kl="oj._underUpdate";a.vb.FC="oj.collectionUpdating";a.vb.Q4="oj.collectionSubscription";a.vb.X4="oj.collectionUpdatingFunc";a.vb.map=function(c,b,d){function e(b){return function(d){f[a.vb.kl]||c.set(b,d)}}var f,h,k,l;if(c instanceof a.t){h=Array(c.ag());f=d?g.observableArray(h):h;a.vb.Pja(f,c);if(d)for(h=0;h<c.Bd.length;h++)k=c.Bd[h],f()[k]=a.vb.map(c.Pr(k,null,
!0,!1),b);else for(h=0;h<c.Bd.length;h++)k=c.Bd[h],f[k]=a.vb.map(c.Pr(k,null,!0,!1),b);h=function(b){var d;try{if(!f[a.vb.kl]){f[a.vb.FC]=!0;for(d=0;d<b.length;d++){var e=b[d].index,g=a.vb.ld(b[d].value),h=b[d].status;"added"===h?e>=c.length-1?c.add(g):c.add(g,{at:e}):"deleted"===h&&c.ty(g,e)}c.comparator&&(f[a.vb.kl]=!0,f.sort(function(b,d){return a.vb.E$(b,d,c.comparator,c,this)}),f[a.vb.kl]=!1)}}catch(k){throw k;}finally{f[a.vb.FC]=!1}};d&&f.subscribe&&(f[a.vb.X4]=h,f[a.vb.Q4]=f.subscribe(h,null,
"arrayChange"));d=function(b,c,d){var e;try{!f[a.vb.FC]&&c instanceof a.t&&(f[a.vb.kl]=!0,e=d.index,f.splice(e,1))}catch(g){throw g;}finally{f[a.vb.kl]=!1}};h=function(c,d,e){var g,h;try{if(!f[a.vb.FC]&&d instanceof a.t&&(f[a.vb.kl]=!0,g=d.oHa(c),void 0!==g&&-1<g))if(h=a.vb.map(c,b),e.fillIn){for(var k=Array.isArray(f)?f.length:f().length;k<g;k++)f.splice(k,0,a.vb.map(d.Pr(k,null,!0,!1),b));f.splice(g,1,h)}else f.splice(g,0,h)}catch(l){throw l;}finally{f[a.vb.kl]=!1}};k=function(b){try{!f[a.vb.FC]&&
b instanceof a.t&&(f[a.vb.kl]=!0,g.isObservable(f)?(f[a.vb.Q4]&&f[a.vb.Q4].dispose(),f.removeAll(),f[a.vb.X4]&&f.subscribe(f[a.vb.X4],null,"arrayChange")):f=[])}catch(c){throw c;}finally{f[a.vb.kl]=!1}};l=function(b){try{!f[a.vb.FC]&&b instanceof a.t&&(f[a.vb.kl]=!0,f.sort(function(d,e){return a.vb.E$(d,e,c.comparator,b,this)}))}catch(d){throw d;}finally{f[a.vb.kl]=!1}};c.ur(a.sa.aa.ADD,h,void 0,void 0,!0);c.ur(a.sa.aa.REMOVE,d,void 0,void 0,!0);c.ur(a.sa.aa.RESET,k,void 0,void 0,!0);c.ur(a.sa.aa.SORT,
l,void 0,void 0,!0)}else{if(void 0===c)return;f={};d=c.attributes;h=null;for(h in d)d.hasOwnProperty(h)&&(k=g.observable(c.get(h)),f[h]=k,l=e(h),l.FVa=h,k.subscribe&&k.subscribe(l));d=function(b){var c,d;try{for(d in f[a.vb.kl]=!0,c=b.X1(),c)if(c.hasOwnProperty(d))f[d](b.get(d))}catch(e){throw e;}finally{f[a.vb.kl]=!1}};c.ur(a.sa.aa.CHANGE,d,void 0,void 0,!0);a.vb.Pja(f,c);b&&b(f)}return f};o_("KnockoutUtils.map",a.vb.map,a);a.vb.ld=function(c){return c instanceof a.T?c:c.hasOwnProperty(a.vb.o3)?
c[a.vb.o3]:c};a.vb.E$=function(c,b,d,e,f){return a.t.H6(a.vb.ld(c),a.vb.ld(b),d,e,f)};a.vb.Pja=function(c,b){Object.defineProperty(c,a.vb.o3,{value:b,enumerable:!1})}});