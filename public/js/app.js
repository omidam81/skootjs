}, 500)
})
}
var y = n.getCurrentId(),
    h = n.interviews,
    b = function() {
        return h.count({
            id: y,
            where: {
                or: [{
                    status: "live"
                }, {
                    status: "pending"
                }, {
                    status: "requestForChange"
                }]
            }
        })
    };
e.totalItems = b();
e.items = [], e.pageIsLoading = !1, e.itemsPerPage = 10, g(h, 1, "live"), e.pagination = {
    current: 1
}, e.pageChanged = function(t) {
    !1 === e.pageIsLoading && g(h, t, "live", e.searchText)
}, e.salary = function(e) {
    return c.print(e)
}, e.reject = function(t) {
    for (var n = e.interviews.length - 1; n >= 0; n--) e.interviews[n].id == t.id && (e.interviews[n].status = "rejected");
    r.prototype$updateAttributes({
        id: t.id
    }, {
        updateBy: "cand",
        status: "rejected"
    }, function() {
        e.totalItems = b(), r.InterviewComp({
            interviewId: t.id,
            subject: "rejected"
        }), o.pop("warning", l.getString("Rejected"), l.getString("Interview has been rejected")), m.addInterviewLogReject({
            interviewId: t.id
        })
    }, function() {})
}, e.approve = function(t) {
    for (var n = e.interviews.length - 1; n >= 0; n--) e.interviews[n].id == t.id && (e.interviews[n].status = "live");
    r.prototype$updateAttributes({
        id: t.id
    }, {
        updateBy: "cand",
        status: "live"
    }, function() {
        r.InterviewComp({
            interviewId: t.id,
            subject: "approved"
        }), o.pop("success", l.getString("Approved"), l.getString("Interview has been approved")), m.addInterviewLogAccept({
            interviewId: t.id
        })
    }, function() {})
}, e.changeTime = function(t) {
    if ("rejected" != t.status) {
        d.open({
            animation: !0,
            templateUrl: "mvc/views/directives/interview-change-modal.html",
            controller: "editInterviewController",
            resolve: {
                interview: function() {
                    return t
                }
            }
        }).result.then(function(n) {
            var o = n,
                a = o.start,
                i = o.end;
            a instanceof Date || (a = new Date(a)), i instanceof Date || (i = new Date(i)), o.duration = Math.round((i.getTime() - a.getTime()) / 6e4);
            for (var s = e.interviews.length - 1; s >= 0; s--) e.interviews[s].id == t.id && (e.interviews[s] = o)
        })
    }
}
};
t.module("scootApp").controller("userJobsInterviewsController", ["$scope", "$rootScope", "Candidate", "toaster", "$q", "$timeout", "$sendEmail", "Interview", "$uibModal", "jobSalary", "gettextCatalog", "$http", "candidate", "InteractionLog", o])
}(window, window.angular),
function(e, t, n) {
    "use strict";
    var o;
    o = function(t, n, o, a) {
        var i = this,
            s = t.matches;
        i.candidateInfo = a, i.matchcalculating = e.matchcalculating, i.totalItems = s.count({
            id: i.candidateInfo.candidate.id,
            filter: {
                include: [{
                    relation: "job",
                    scope: {
                        where: {
                            status: "live"
                        }
                    }
                }],
                order: "score DESC",
                where: {
                    status: "live"
                }
            }
        }, function(e, t) {
            console.log(t)
        }), i.items = [], i.pageIsLoading = !0, i.itemsPerPage = 25, i.pagination = {
            current: 1
        }, i.pageChanged = function(e) {
            !1 === i.pageIsLoading && d(s, e, "live", i.searchText)
        };
        var r = function(e, t, n, o) {
                return i.pageIsLoading = !0, o || (o = ""), e({
                    id: i.candidateInfo.candidate.id,
                    filter: {
                        include: [{
                            relation: "job",
                            scope: {
                                fields: ["id", "title", "informalAddress", "address", "description", "published", "businessId", "status", "salaryFrom", "salaryTo", "salaryRate", "typeOfSalary", "salaryHidden", "salaryPeriod", "acceptsForeigners", "packageName"],
                                include: [{
                                    relation: "business",
                                    scope: {
                                        fields: ["id", "name", "profileImg", "status", "companyId", "responseRate", "responseTime"],
                                        include: [{
                                            relation: "company",
                                            scope: {
                                                fields: ["id", "email", "companyName"]
                                            }
                                        }]
                                    }
                                }, {
                                    relation: "typeOfEmployment"
                                }],
                                where: {
                                    status: "live"
                                }
                            }
                        }],
                        order: "score DESC",
                        limit: i.itemsPerPage,
                        skip: i.itemsPerPage * (t - 1),
                        fields: ["created_at", "id", "jobId", "status", "expires"]
                    }
                })
            },
            d = function(e, t, a, s) {
                n.all({
                    matches: r(e, t, 0, s).$promise
                }).then(function(e) {
                    i.items = e, o(function() {
                        i.pageIsLoading = !1
                    }, 500)
                }).catch(function(e) {
                    console.log(e)
                })
            };
        d(s, 1, "live")
    }, t.module("candidate.core").controller("UserJobsMatchedCtrl", ["Candidate", "$q", "$timeout", "candidate", o])
}(window, window.angular),
function(e, t, n) {
    "use strict";
    var o;
    o = function(e, t, n, o) {
        var a = this,
            i = e.shorList;
        a.candidateInfo = o, a.totalItems = i.count({
            id: a.candidateInfo.candidate.id,
            where: {
                businessId: {
                    neq: ""
                }
            }
        }), a.items = [], a.pageIsLoading = !1, a.itemsPerPage = 10, a.pagination = {
            current: 1
        }, a.pageChanged = function(e) {
            !1 === a.pageIsLoading && r(i, e, "live")
        };
        var s = function(e, t, n, o) {
                return a.pageIsLoading = !0, o || (o = ""), e({
                    id: a.candidateInfo.candidate.id,
                    filter: {
                        include: [{
                            relation: "business",
                            scope: {
                                fields: ["id", "name", "profileImg", "status", "companyId", "responseRate", "responseTime"],
                                include: {
                                    relation: "company",
                                    scope: {
                                        fields: ["id", "email"]
                                    }
                                }
                            }
                        }, {
                            relation: "typeOfEmployment"
                        }],
                        where: {
                            businessId: {
                                neq: ""
                            }
                        },
                        order: "published ASC",
                        limit: a.itemsPerPage,
                        skip: a.itemsPerPage * (t - 1),
                        fields: ["id", "title", "informalAddress", "address", "description", "published", "businessId", "status", "salaryFrom", "salaryTo", "salaryRate", "typeOfSalary", "salaryHidden", "salaryPeriod", "acceptsForeigners", "packageName", , "responseRate", "responseTime"]
                    }
                })
            },
            r = function(e, o, i, r) {
                t.all({
                    jobs: s(e, o, 0, r).$promise
                }).then(function(e) {
                    a.items = e, n(function() {
                        a.pageIsLoading = !1
                    }, 500)
                })
            };
        r(i, 1, "live")
    }, t.module("candidate.core").controller("UserJobsShortlistedCtrl", ["Candidate", "$q", "$timeout", "candidate", o])
}(window, window.angular),
function(e, t, n) {
    "use strict";
    var o = function(e, t, n, o, a, i, s, r, d, c, l, u) {
            var p = this;
            p.email = "", p.password = "", p.resend = !1, p.loading = !1, p.submit = function() {
                p.loading = !0, o.login({
                    email: p.email,
                    password: p.password
                }, function(e) {
                    if (console.log(e), p.getCandidate = e.user, "deleted" == e.user.status) o.logout(function() {
                        n.put("userType", !1), i.pop("error", s.getString("Account deleted"), s.getString("Unfortunately your account is deleted. Please contact the support at helpdesk@") + r.host().replace("www.", "")), p.loading = !1
                    });
                    else {
                        n.put("userType", "candidate"), n.put("asked4CV", !1), e.user.location && e.user.address && e.user.informalAddress && (n.get("location") || n.put("location", e.user.location.lat + "," + e.user.location.lng), n.get("address") || n.put("address", e.user.address), n.get("informalAddress") || n.put("informalAddress", e.user.informalAddress));
                        var a = n.get("jobBeforeLogin"),
                            c = (n.get("viewslug"), n.get("stateBeforeLogin"));
                        if (d.expressLoginJob && d.expressLoginState) p.ApplyForJob(d.expressLoginJob, o.getCurrentId()), r.path(d.expressLoginState), d.expressLoginJob = void 0, d.expressLoginState = void 0, t.reload();
                        else if (a && !1 !== a && "false" != a) n.remove("jobBeforeLogin"), n.remove("viewslug"), t.go("user");
                        else if (c && !1 !== c && "false" != c && "mainCandidate" != c) "job" == c ? t.go(n.get("jobBeforeLogin")) : t.go(c);
                        else {
                            var l = e.user.percentage;
                            l < 50 ? t.go("user-edit-profile.step-one") : t.go("user")
                        }
                    }
                }, function(e) {
                    p.loading = !1, e.data ? "LOGIN_FAILED_EMAIL_NOT_VERIFIED" == e.data.error.code ? (i.pop("warning", s.getString("Email verification needed"), s.getString("Login failed as the email has not been verified")), p.resend = !0) : "USERNAME_EMAIL_REQUIRED" == e.data.error.code ? i.pop("warning", s.getString("Wrong Credentials"), s.getString("Email is required")) : i.pop("warning", s.getString("Login Failed"), s.getString("Your email or password is incorrect.")) : i.pop("warning", s.getString("Login Failed"), s.getString("Your email or password is incorrect."))
                })
            }, "email" == a.error ? i.pop("error", s.getString("Facebook login issue"), s.getString("An account with your email already exists. Please login with email or try reset password by clicking on 'Forgot password?'")) : "unseen_email" == a.error ? i.pop("error", s.getString("Facebook permission issue"), s.getString("We can not get your email from Facebook. Please adjust permissions for 'Skoot' app in your privacy settings on Facebook")) : a.error && i.pop("error", s.getString("Facebook login issue"), s.getString("An unknown error occured. Please try later or login with your email and password")), p.slugify = function(e) {
                return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
            }, p.ApplyForJob = function(e, t) {
                c.applyForJob({
                    jobId: e.id,
                    candidateId: t,
                    foreigner: !1
                }, function(t) {
                    t.res.success ? (u.applications[e.id] = t.res.result, u.apps.push(e.id), i.pop("success", s.getString("Success"), s.getString("You have successfully applied to this job!")), ga("send", "event", {
                        eventCategory: "Apply Now",
                        eventAction: "click",
                        transport: "beacon"
                    })) : i.pop("error", s.getString("Oh no!"), s.getString("Something went wrong!"))
                })
            }
        },
        a = function(e, t, n) {
            var o = this;
            o.email = "", o.succeed = !1, o.submit = function() {
                e.resetPassword({
                    email: o.email
                }, function() {
                    o.email = "", t.pop("success", n.getString("Check your email"), n.getString("A password reset link with further instructions has been sent to your inbox")), o.succeed = !0
                }, function() {
                    t.pop("warning", n.getString("Wrong Email"), n.getString("An account with this email does not exist on SkootJobs.com"))
                })
            }
        },
        i = function(e, t, n, o, a, i) {
            var s = this;
            s.submit = function(r) {
                if (s.password.length > 7 && s.confirmation.length > 7 && s.password != s.confirmation) return void n.pop("warning", a.getString("Warning"), a.getString("Passwords do not match"));
                r && (i.defaults.headers.common.authorization = o.token, t.prototype$updateAttributes({
                    id: o.uid,
                    password: s.password
                }, function() {
                    e.go("user-login"), n.pop("success", a.getString("Success!"), a.getString("Your credentials have been updated"))
                }, function() {
                    n.pop("warning", a.getString("Error!"), a.getString("Something is wrong"))
                }))
            }
        },
        s = function(e, t, n, o, a, i, s) {
            var r = this;
            r.submit = function(d) {
                if (r.password.length > 7 && r.confirmation.length > 7 && r.password != r.confirmation) return void n.pop("warning", a.getString("Warning"), a.getString("Passwords do not match"));
                d && (i.defaults.headers.common.authorization = o.token, t.prototype$updateAttributes({
                    id: o.uid,
                    password: r.password
                }, function() {
                    n.pop("success", a.getString("Success!"), a.getString("Your credentials have been updated")), t.findById({
                        id: o.uid
                    }, function(n, o) {
                        t.login({
                            email: n.email,
                            password: r.password
                        }, function() {
                            s.put("userType", "candidate"), s.put("asked4CV", !1), e.go("user-edit-profile.step-one")
                        })
                    })
                }, function() {
                    n.pop("warning", a.getString("Error!"), a.getString("Something is wrong"))
                }))
            }
        },
        r = function(e, t, n, o) {
            t.put("userId", o.currentUserId), t.put("access_token", o.currentUserId), o.currentUserId = t.get("nuserId") || null, o.accessTokenId = t.get("naccess_token") || "", o.rememberMe = !0, o.save(), n.getCurrent(function() {
                t.put("userType", "candidate"), e.go("user-edit-profile.step-one")
            })
        },
        d = function(t, n, o, a, i, s) {
            a.currentUserId = n.get("nuserId") || null, a.accessTokenId = n.get("naccess_token") || "", n.put("userId", a.currentUserId), n.put("access_token", a.currentUserId), a.rememberMe = !0, a.save();
            var r = n.get("newuser") || "no",
                d = n.get("userId") || null;
            if (null === d) return void t.go("user-login");
            o.findById({
                id: d,
                filter: {
                    include: [{
                        relation: "skills"
                    }, {
                        relation: "certificates"
                    }, {
                        relation: "professions"
                    }, {
                        relation: "languages"
                    }, {
                        relation: "typeOfEducation"
                    }]
                }
            }, function(o, a) {
                if (n.put("userType", "candidate"), "yes" == r) {
                    fbq("track", "CompleteRegistration"), s("send", "event", "button", "click", "reg-fb");
                    if (e.location.href.includes("job-from-skootjobs")) {
                        var d = document.createElement("IMG");
                        d.height = "1", d.width = "1", d.border = "0", d.src = "//conv.indeed.com/pagead/conv/6946241126079866/?script=0", document.body.appendChild(d)
                    }
                    i({
                        method: "GET",
                        url: "//www.googleadservices.com/pagead/conversion/962397849/?label=ILiSCL7gh2QQmY30ygM&amp;guid=ON&amp;script=0"
                    }).success(function() {}).error(function() {})
                }
                a.percentage < 50 ? t.go("user-edit-profile.step-one") : t.go("user")
            }, function(e) {
                console.log("err", e)
            })
        },
        c = function(e, t, n) {
            "email" == t.error ? e.pop({
                type: "error",
                title: n.getString("Facebook login issue"),
                body: n.getString("An account with your email already exists. Please login with email or try reset password by clicking on 'Forgot password?'"),
                showCloseButton: !0,
                toasterId: 2
            }) : t.error && e.pop({
                type: "error",
                title: n.getString("Facebook login issue"),
                body: n.getString("An unknown error occured. Please try later or login with your email and password"),
                showCloseButton: !0,
                toasterId: 2
            })
        },
        l = function(e, t, n) {
            t.confirm({
                uid: n.uid,
                token: n.token
            }, function() {
                e.go("user-login")
            })
        };
    t.module("scootApp").controller("candidateLoginController", ["$scope", "$state", "$cookies", "Candidate", "$stateParams", "toaster", "gettextCatalog", "$location", "$rootScope", "JobApplication", "$sendEmail", "candidateData", o]).controller("candidateForgotController", ["Candidate", "toaster", "gettextCatalog", a]).controller("candidateResetController", ["$state", "Candidate", "toaster", "$stateParams", "gettextCatalog", "$http", i]).controller("enterPasswordController", ["$state", "Candidate", "toaster", "$stateParams", "gettextCatalog", "$http", "$cookies", s]).controller("candidateFbLoginController", ["$state", "$cookies", "Candidate", "LoopBackAuth", r]).controller("candidateFbSigninController", ["$state", "$cookies", "Candidate", "LoopBackAuth", "$http", "ga", d]).controller("candidateFbSigninErrorController", ["toaster", "$stateParams", "gettextCatalog", c]).controller("candidateConfirmController", ["$state", "Candidate", "$stateParams", l])
}(window, window.angular),
function(e, t, n) {
    "use strict";
    t.module("scootApp").controller("homeMainCandCtrl", ["$scope", "$rootScope", "$timeout", "$state", "$window", "User", "$cookies", "toaster", "gettextCatalog", function(t, n, o, a, i, s, r, d, c) {
        var l = r.get("userType");
        "company" == l ? a.go("company") : "candidate" == l && a.go("user"), o(function() {
            $("#hiring-owl").owlCarousel({
                loop: !0,
                margin: 20,
                nav: !1,
                autoplay: !0,
                autoplayTimeout: 2e3,
                smartSpeed: 500,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                    1200: {
                        items: 6
                    },
                    1600: {
                        items: 8
                    }
                }
            })
        }, 0), o(function() {
            $("#featured-owl").owlCarousel({
                loop: !0,
                margin: 20,
                nav: !1,
                autoplay: !0,
                autoplayTimeout: 2e3,
                smartSpeed: 500,
                responsive: {
                    0: {
                        items: 1
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                    1200: {
                        items: 6
                    },
                    1600: {
                        items: 8
                    }
                }
            })
        }, 0), o(function() {
            "search" != a.current.name && $(".footer").removeClass("col-custom-right col-md-push-3 col-lg-push-3")
        }, 0), t.isMobileRes = function() {
            return e.innerWidth < 768
        }, t.isLogged = function() {
            var e = s.isAuthenticated(),
                t = r.get("userType");
            return !!("candidate" == t && e || "company" == t && e) || (r.put("userType", !1), !1)
        }, t.ishomeCand = function() {
            return "mainCandidate" == a.current.name
        }, t.options = {}, t.submitSearch = function() {
            t.options.mapIsValid && a.go("search-wp", t.options)
        }, t.hiringItems = function() {
            for (var e = [], t = 1; t < 26; t++) e.push(t);
            return e
        }, t.featuredItems = function() {
            for (var e = [], t = 1; t < 11; t++) e.push(t);
            return e
        }, t.jobCats = [{
            slug: "accounting-and-finance",
            title: "Accounting & Finance",
            bgImage: "01-min.jpg",
            iconClass: "cat01",
            catId: "56b81283d9bd7b375c2cb577"
        }, {
            slug: "admin-hr-and-management",
            title: "Admin, HR & Management",
            bgImage: "02-min.jpg",
            iconClass: "cat02",
            catId: "56bd3f0bc745636a67c26544"
        }, {
            slug: "computer-and-it",
            title: "Computer & IT",
            bgImage: "03-min.jpg",
            iconClass: "cat03",
            catId: "56bea6044e19f3d47474abe3"
        }, {
            slug: "customer-service-sales-and-retail",
            title: "Customer Service, Sales & Retail",
            bgImage: "04-min.jpg",
            iconClass: "cat04",
            catId: "56b812d2d9bd7b375c2cb57d"
        }, {
            slug: "engineering",
            title: "Engineering",
            bgImage: "05-min.jpg",
            iconClass: "cat05",
            catId: "56b812bfd9bd7b375c2cb57a"
        }, {
            slug: "food-and-beverage",
            title: "Food & Beverage",
            bgImage: "06-min.jpg",
            iconClass: "cat06",
            catId: "56b812e6d9bd7b375c2cb57f"
        }, {
            slug: "education-and-training",
            title: "Education & Training",
            bgImage: "07-min.jpg",
            iconClass: "cat07",
            catId: "56bd40e6c745636a67c26548"
        }, {
            slug: "marketing",
            title: "Marketing",
            bgImage: "08-min.jpg",
            iconClass: "cat08",
            catId: "56b812c5d9bd7b375c2cb57b"
        }], t.testimonials = [{
            name: "Tengku Muzani",
            text: "When I think of SkootJobs, I think of two things: Easy to use and great support when I need it",
            role: " ",
            business: " ",
            link: " ",
            avatar: "cand-test-1-min.jpg"
        }, {
            name: "Dulanjalee",
            text: "Within days of using SkootJobs, I managed to secure a job with a good company that I really enjoy working with. I couldnâ€™t believe it was that fast!",
            role: " ",
            business: " ",
            link: " ",
            avatar: "cand-test-2-min.jpg"
        }, {
            name: "Maya Zaharudin",
            text: "SkootJobs has made my job search easier and more efficient. Itâ€™s easy to browse through jobs and the job matches save me a lot of time in finding what Iâ€™m after.",
            role: " ",
            business: " ",
            link: " ",
            avatar: "cand-test-3-min.jpg"
        }], o(function() {
            i.onscroll = function() {
                var t = document.body.scrollTop,
                    n = e.innerWidth,
                    o = $(e).scrollTop();
                n > 767 && ($(".home-top .login-content .switcher").css("top", .8 * t * -1 + "px"), $(".home-top .login-content .main-title").css("top", .7 * t * -1 + "px"), $(".home-top .login-content .sub-title").css("top", .7 * t * -1 + "px"), $(".home-top .login-content .top-button").css("top", .6 * t * -1 + "px"), $(".home-top  .top-search").css("padding", 30 + .04 * t + "px 0px"), n > 992 && $(".home-top").css("background-position", "0px " + .5 * t + "px")), o > 500 ? $(".skoot-home .tinySignup").fadeIn(200) : $(".skoot-home .tinySignup").fadeOut(200)
            }
        }, 0), o(function() {
            var t = e.innerHeight,
                n = e.innerWidth;
            n < 1400 && n > 767 && t < 800 && $(".home-top").css("min-height", t + "px"), t < 700 && $(".arrow-bounce").hide()
        }, 0), t.scrollToContent = function() {
            o(function() {
                $("html, body").delay(300).animate({
                    scrollTop: $(".hiring-now").offset().top
                }, 1500)
            }, 0)
        }
    }]), t.module("scootApp").config(function() {})
}(window, window.angular),
function(e, t, n) {
    "use strict";
    var o;
    o = function(t, n, o, a, i, s, r, d, c, l, u) {
        e.onresize = function() {
            var t = e.innerHeight - 30;
            $(".mCustomScrollbar").css("height", t)
        }, l(function() {
            $(".messages-page").animate({
                opacity: "1"
            }, 500)
        }, 1500), t.candidateId = i.getCurrentId(), t.candidate = i.getCurrent(), t.newMessage = {
            text: "",
            fromId: t.candidateId,
            candidateId: t.candidateId,
            fromType: "Candidate",
            toType: "Company"
        }, t.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], t.contactsoptions = [], t.showcontactsoptions = function(e) {
            t.contactsoptions[e] = !t.contactsoptions[e]
        }, t.hideDetails = !1, t.hideDetailsbtn = function() {
            t.hideDetails = !t.hideDetails, l(function() {
                $(".messages-area .message").scrollTop($(".messages-area .message")[0].scrollHeight)
            }, 300, !1)
        }, t.showoptions = !1, t.showoption = function() {
            t.showoptions = !t.showoptions
        }, t.searchopened = !1, t.opensearch = function() {
            t.searchopened = !t.searchopened
        }, t.messageoptionopened = !1, t.openmessagesoption = function() {
            t.messageoptionopened = !t.messageoptionopened
        }, t.conversationopened = !1, e.Intercom("shutdown"), t.config = {
            autoHideScrollbar: !1,
            theme: "dark",
            advanced: {
                updateOnContentResize: !0
            },
            setHeight: d.innerHeight - 30,
            scrollInertia: 400
        }, t.conversation = [], t.conversations = {}, t.selectedKey = {}, t.checkConversations = function() {
            var e = t.conversations;
            return 0 !== Object.keys(e).length
        }, t.messages = i.messages({
            id: t.candidateId,
            filter: {
                include: [{
                    relation: "company",
                    scope: {
                        fields: ["id", "email", "companyName"]
                    }
                }, {
                    relation: "job",
                    scope: {
                        fields: ["title", "businessId"],
                        include: {
                            relation: "business",
                            scope: {
                                fields: ["name", "profileImg"]
                            }
                        }
                    }
                }, {
                    relation: "candidate",
                    scope: {
                        fields: ["id", "email", "name", "profileImg", "surname"]
                    }
                }]
            }
        }, function(e) {
            t.groupMessages(e), t.noMessages = e.length < 1
        }, function(e) {}), t.$watch("messages", function(e) {
            t.groupMessages(e)
        }), t.groupMessages = function(e) {
            t.conversations = {};
            for (var n = 0; n < e.length; n++) t.conversations[e[n].jobId] || (t.conversations[e[n].jobId] = []), t.conversations[e[n].jobId].push(e[n]);
            t.conversations[t.selectedKey] && (t.conversation = t.conversations[t.selectedKey])
        }, t.selectConversation = function(e, n) {
            t.conversationopened = !0, t.selectedKey = n, t.conversation = e, t.currentChat = e[0], t.currentChat.name = e[0].job.business.name, t.newMessage.text = "", l(function() {
                $(".messages-area .message").scrollTop($(".messages-area .message")[0].scrollHeight)
            }, 0, !1)
        }, t.toggleList = function(e) {
            l(function() {
                jQuery(".list-toggle").hasClass("active") ? (jQuery(".list-toggle").removeClass("active"), jQuery(".list-toggle").addClass("fa-chevron-right"), jQuery(".list-toggle").removeClass("fa-times"), jQuery(".people").animate({
                    left: "-290px"
                }, 300)) : (jQuery(".people").animate({
                    left: "0px"
                }, 300), jQuery(".list-toggle").addClass("active"), jQuery(".list-toggle").addClass("fa-times"), jQuery(".list-toggle").removeClass("fa-chevron-right"))
            }, 0, !1)
        }, t.getConversationJobTitle = function(e) {
            return 0 === e.length ? "" : e[0].job.title
        }, t.getConversationBusinessName = function(e) {
            return 0 === e.length ? "" : e[0].job.business.name
        }, t.getConversationBusinessProfileImg = function(e) {
            return 0 === e.length ? "" : e[0].job.business.profileImg
        }, t.getConversationLastMessageText = function(e) {
            return 0 === e.length ? "" : e[0].text
        }, t.getConversationLastMessageDate = function(e) {
            return 0 === e.length ? "" : e[0].date
        }, t.slug = function(e) {
            return e.replace(/ /g, "-").toLowerCase()
        }, t.openJob = function(e) {
            var n = e[0].jobId;
            o.go("job", {
                jobId: n,
                slug: t.slug(e[0].job.title)
            })
        }, t.send = function() {
            t.conversation && 0 !== t.conversation.length && i.sendMessage({
                id: t.candidateId
            }, {
                companyId: t.conversation[0].companyId,
                text: t.newMessage.text,
                jobId: t.conversation[0].jobId
            }, function(e) {
                t.conversation[0].candidate, t.conversation[0].job;
                r.messageCompany({
                    candidateId: t.candidateId,
                    jobId: t.conversation[0].jobId,
                    text: t.newMessage.text
                }), t.newMessage.text = ""
            }, function(e) {}).$promise.then(function(e) {
                t.refresh(), l(function() {
                    $(".messages-area .message").scrollTop($(".messages-area .message")[0].scrollHeight)
                }, 1500)
            })
        }, t.refresh = function() {
            i.messages({
                id: t.candidateId,
                filter: {
                    where: {
                        candidateId: t.candidateId
                    },
                    include: [{
                        relation: "company",
                        scope: {
                            fields: ["id"]
                        }
                    }, {
                        relation: "job",
                        scope: {
                            fields: ["title", "businessId"],
                            include: {
                                relation: "business",
                                scope: {
                                    fields: ["name", "profileImg"]
                                }
                            }
                        }
                    }]
                }
            }, function(e) {
                t.messages = e, l(function() {
                    jQuery("#autoscroll").mCustomScrollbar("scrollTo", ["bottom", "right"])
                }, 0, !1)
            }, function(e) {})
        }, t.isMobile = function() {
            l(function() {
                d.innerWidth < 767 && jQuery(".list-toggle").click()
            }, 0)
        }, t.backToList = function() {
            t.currentChat = !1, t.conversationopened = !1, t.hideDetails = !1
        }
    }, t.module("scootApp").controller("messagesCandidateCtrl", ["$scope", "$rootScope", "$state", "$cookies", "Candidate", "Company", "Message", "$window", "$sendEmail", "$timeout", "gettextCatalog", o])
}(window, window.angular),
function(e, t, n) {
    "use strict";
    var o;
    o = function(n, o, a, i, s, r, d, c, l, u, p, m, f, g, y, h, b, k, v) {
        var w = this;
        o.isiOS = function() {
            var t = (e.navigator.standalone, e.navigator.userAgent.toLowerCase());
            /safari/.test(t);
            if (/iphone|ipod|ipad/.test(t)) return !0
        }, o.uploadCV = function() {
            o.isiOS() && (t.element("#cvUploadBtn").attr("disabled", "disabled"), t.element("#cvChangeBtn").attr("disabled", "disabled"), p.pop("warning", "Warning", "Due to latest iOS update, iPhone and iPad users are unable to upload their resume/CV, but don't worry, you can still use your PC to upload your resume/CV"), setTimeout(function() {
                t.element("#cvUploadBtn").removeAttr("disabled"), t.element("#cvChangeBtn").removeAttr("disabled")
            }, 3e3))
        }, o.salarySliderOptions = {
            floor: 0,
            ceil: 15e3,
            step: 100
        }, o.$watch("mapIsValid", function() {
            o.mapIsValid ? o.registration.userLocation.$setValidity("required", !0) : o.registration.userLocation.$setValidity("required", !1)
        }), o.$watch(t.bind(w, function(e) {
            return w.candidate.professions
        }), function(e, n) {
            if (!t.equals(e, n)) {
                var a = {
                    add: [],
                    remove: []
                };
                void 0 === w.candidate.professions || 0 == w.candidate.professions.length ? o.roleselected = !1 : o.roleselected = !0, a = c.compareArrays(e, n);
                var i = [];
                if (void 0 !== a.add && a.add.length > 0) {
                    i = [];
                    for (var s = 0; s < a.add.length; s++) i = a.add[s].skills.filter(function(e) {
                        if (void 0 !== w.candidate.skills && w.candidate.skills.length > 0)
                            for (var t = 0; t < w.candidate.skills.length; t++)
                                if (w.candidate.skills[t].id == e.id) return !1;
                        return void 0 !== e.professionId
                    }), w.candidate.skills = w.candidate.skills.concat(i)
                }
            }
        }, !0), o.allProfs = [], o.professions = [], o.allSkills = [], s.getProfessions().$promise.then(function(e) {
            o.professions = e
        }), s.getProfessionsWithCategoryName().$promise.then(function(e) {
            o.allProfs = e
        }), s.getSkills().$promise.then(function(e) {
            o.allSkills = e
        }), w.candidate = i, w.preselectedSkills = w.candidate.skills, w.candidate.informalAddress || (w.candidate.informalAddress = w.candidate.address), w.typesOfEmployment = [], w.saving = !1;
        var _ = [],
            T = [],
            C = [],
            E = {
                id: "",
                name: "",
                surname: "",
                cvFile: "",
                address: "",
                location: "",
                salaryFrom: 0,
                salaryTo: 0,
                salaryPeriod: "month",
                informalAddress: "",
                state: "",
                city: ""
            };
        t.copy(w.candidate.professions, _), t.copy(w.candidate.skills, T), t.copy(w.candidate.typeOfEmployment, C), E.languages && delete E.languages, s.getTypesOfEmployment().$promise.then(function(e) {
            return s.parseTypesOfEmployment(e)
        }).then(function(e) {
            w.typesOfEmployment = e
        }), w.save = function(n) {
            if (n && w.candidate.professions.length > 0 && w.candidate.skills.length > 0) {
                w.saving = !0;
                for (var s in w.candidate) E.hasOwnProperty(s) && (E[s] = w.candidate[s]);
                E.languages && delete E.languages, m.saveData(E, function(n) {
                    if (n) return void y.error(n);
                    if (o.mapIsValid && null != i.informalAddress) {
                        for (var s = [], r = 0; r < w.candidate.professions.length; r++) delete w.candidate.professions[r].catName;
                        var d = m.linkRelations(_, w.candidate.professions, f.professions, w.candidate.id),
                            c = m.linkRelations(T, w.candidate.skills, f.skills, w.candidate.id),
                            l = m.linkRelations(C, w.candidate.typeOfEmployment, f.typeOfEmployment, w.candidate.id);
                        t.extend(s, d, c, l), g.all(s).then(function() {
                            return e.matchcalculating = !0, setTimeout(function() {
                                v.CandidateFindMatch({
                                    candidateId: w.candidate.id
                                }).$promise.then(function() {
                                    e.matchcalculating = !1, delete e.matchcalculating
                                }, function(t) {
                                    e.matchcalculating = !1, delete e.matchcalculating
                                }), f.updateprofileCompletion({
                                    id: w.candidate.id
                                })
                            }, 100)
                        }).then(function() {
                            p.pop("success", "Saved", "Your profile information has been saved"), a.go("user-edit-profile.step-two"), ga("send", "event", {
                                eventCategory: "complete profile stage 1",
                                eventAction: "click",
                                transport: "beacon"
                            })
                        }).catch(function(e) {
                            y.error(e), w.saving = !1
                        })
                    }
                })
            } else r(function() {
                d()
            }, 400)
        }, w.cvUploader = new l({
            url: u.api + "/containers/cv" + w.candidate.id + "/upload"
        }), w.cvUploader.filters.push({
            name: "cvFilter",
            fn: function(e) {
                if (e.type) {
                    return -1 !== "|doc|docx|pdf|vnd.openxmlformats-officedocument.wordprocessingml.document|msword|rtf|".indexOf("|" + e.type.slice(e.type.lastIndexOf("/") + 1) + "|")
                }
                for (var t = ["doc", "docx", "pdf", "rtf"], n = e.name.split(".").pop(), o = 0; o < t.length; o++)
                    if (t[o] == n) return !0;
                return !1
            }
        }), w.cvUploader.filters.push({
            name: "cvSize",
            fn: function(e) {
                return e.size <= 4194304
            }
        }), w.cvUploader.onWhenAddingFileFailed = function(e, n) {
            n && "cvFilter" === n.name && (p.pop("warning", "Wrong type!", "Accepted file types are doc, docx, rtf and pdf"), t.element("input[type='file']").val(null)), n && "cvSize" === n.name && (p.pop("warning", "File size too large, maximum upload file size is 4MB!", "Tip: Most employers prefer short resumes"), t.element("input[type='file']").val(null))
        }, w.cvUploader.onAfterAddingFile = function(e) {
            w.showLoader = !0, w.saving = !0, e.file.name = e.file.name.replace(/\s/g, ""), e.upload()
        }, w.cvUploader.onCompleteItem = function(e) {
            w.candidate.cvFile = u.api + "/containers/cv" + w.candidate.id + "/download/" + e.file.name, w.showLoader = !1, w.saving = !1, p.pop("success", "Success!", "Your CV has been uploaded!")
        }
    }, t.module("candidate.core").controller("RegStepOneCtrl", ["$rootScope", "$scope", "$state", "candidate", "CommonDataService", "$timeout", "scrollToError", "DataUtilityService", "FileUploader", "appConfig", "toaster", "CandidateDataService", "Candidate", "$q", "$log", "Category", "Profession", "$window", "Match", o])
}(window, window.angular),
function(e, t, n) {
    "use strict";
    var o;
    o = function(e, n, o, a, i, s, r, d, c, l, u, p, m, f, g, y, h) {
        var b = this;
        console.log(p), b.candidate = a, b.nationalities = s, b.days = c.days, b.years = c.years, b.months = c.months, b.uploader = [], b.uploading = !1, b.showLoader = !1, b.saving = !1, b.onBeforeUploadItem = {}, e.tempImg = [], e.tempCrpdImg = [], e.tempItem = [], b.stripAllTags = i, b.customMenu = [
            ["bold", "italic", "underline"],
            ["ordered-list", "unordered-list"]
        ], t.isUndefined(b.candidate.nationality) && (b.candidate.nationality = "Malaysian"), b.processHtml = h, b.candidate.about = b.processHtml(b.candidate.about), "undefined" != b.candidate.about && b.candidate.about || (b.candidate.about = ""), b.candidate.dateChanges = function(e) {
            b.candidate.dateOfBirth = e, b.setDate()
        }, this.save = function(e) {
            e && (0 == b.stripAllTags(a.about).length || b.stripAllTags(a.about).length >= 50 && b.stripAllTags(a.about).length <= 500) ? (b.saving = !0, b.candidate.skills && delete b.candidate.skills, b.candidate.professions && delete b.candidate.professions, b.candidate.languages && delete b.candidate.languages, g.saveData(b.candidate, function(e) {
                if (e) return void y.error(e);
                m.pop("success", "Saved", "Your profile information has been saved"), n.go("user-edit-profile.step-three"), ga("send", "event", {
                    eventCategory: "complete profile stage 2",
                    eventAction: "click",
                    transport: "beacon"
                }), o.updateprofileCompletion({
                    id: b.candidate.id
                })
            })) : r(function() {
                d()
            }, 400)
        }, b.updateDateOfBirth = function(e, t, n) {
            var o = [];
            if (t) {
                t.days || (t.days = 31);
                for (var a = 1; a <= t.days; a++) o.push({
                    id: a,
                    name: a
                });
                b.days = o
            }
            if ("undefined" === e && (e = !1), "undefined" === t && (t = !1), "undefined" === n && (n = !1), e && t && n) {
                var i = new Date(n.id, t.id - 1, e.id);
                b.candidate.dateOfBirth = i
            } else b.candidate.dateOfBirth = void 0
        }, b.setDate = function() {
            if (void 0 !== b.candidate.dateOfBirth && "" !== b.candidate.dateOfBirth && b.candidate.dateOfBirth) {
                var e = new Date(a.dateOfBirth);
                "Invalid Date" == e && (e = new Date), b.birth = {
                    Day: {
                        id: e.getDate()
                    },
                    Month: l.getById(b.months, e.getMonth() + 1),
                    Year: {
                        id: e.getFullYear()
                    }
                };
                for (var t = 1; t <= b.birth.Month.days; t++) b.days.push({
                    id: t,
                    name: t
                })
            } else {
                b.birth = {
                    Day: !1,
                    Month: !1,
                    Year: !1
                };
                for (var n = 1; n <= 31; n++) b.days.push({
                    id: n,
                    name: n
                })
            }
        }, b.setDate(), b.uploader = new u({
            url: p.api + "/containers/profile" + b.candidate.id + "/upload"
        }), b.uploader.filters.push({
            name: "imageFilter",
            fn: function(e) {
                return -1 !== "|jpg|png|jpeg|bmp|gif|".indexOf("|" + e.type.slice(e.type.lastIndexOf("/") + 1) + "|")
            }
        }), e.openUploader = function() {
            $("#user-image").click()
        }, b.uploader.onAfterAddingFile = function(n) {
            b.showLoader = !0, n.croppedImage = "";
            var o = new FileReader;
            b.showLoader = !0, o.onload = function(t) {
                e.$apply(function() {
                    n.image = t.target.result, e.tempImg = n.image, b.uploader.queue[0].croppedImage = e.tempCrpdImg
                }), e.tempItem = b.uploader.queue[0]
            }, o.readAsDataURL(n._file), t.element("#cropModal").modal({
                backdrop: "static",
                keyboard: !1
            })
        }, b.onBeforeUploadItem = function() {
            e.tempItem.croppedImage = e.tempCrpdImg;
            var t = e.tempItem;
            b.uploading = !0;
            var n = f(t.croppedImage);
            t.file.name = (new Date).getTime() + t.file.name, t._file = l.dataURItoBlob(n), t.upload()
        }, b.uploader.onCompleteItem = function(e) {
            b.uploading = b.showLoader = !1, t.element("#cropModal").modal("hide"), b.candidate.profileImg = p.api + "/containers/profile" + b.candidate.id + "/download/" + e.file.name, m.pop("success", "Success!", "Your profile image has been uploaded!")
        }, b.uploader.filters.push({
            name: "imageSize",
            fn: function(e) {
                return e.size <= 3048576
            }
        }), b.uploader.onWhenAddingFileFailed = function(e, n) {
            n && "imageFilter" === n.name && (m.pop("warning", "Wrong type!", "Accepted file types are jpg, png, jpeg, bmp and gif"), t.element("input[type='file']").val(null)), n && "imageSize" === n.name && (m.pop("warning", "exceeded max size!", "Please upload images less than 3MB in size"), t.element("input[type='file']").val(null))
        }, t.element("#cropModal").on("hide.bs.modal", function() {
            r(function() {
                t.element('input[type="file"]').val(""), b.uploader.clearQueue(), b.showLoader = !1
            }, 100)
        })
    }, t.module("candidate.core").controller("RegStepTwoCtrl", ["$scope", "$state", "Candidate", "candidate", "stripAllTags", "nationalitiesService", "$timeout", "scrollToError", "dates", "DataUtilityService", "FileUploader", "appConfig", "toaster", "resizeImage", "CandidateDataService", "$log", "processHtml", o])
}(window, window.angular),
function(e, t, n) {
    "use strict";
    var o;
    o = function(e, n, o, a, i, s, r, d, c, l, u, p, m, f, g, y, h) {
            function b() {
                return {
                    start: {
                        year: I.getFullYear(),
                        month: I.getMonth()
                    },
                    end: {
                        year: I.getFullYear(),
                        month: I.getMonth()
                    },
                    employer: "",
                    position: "",
                    id: d.generateRandomString()
                }
            }

            function k() {
                return {
                    start: {
                        year: I.getFullYear(),
                        month: I.getMonth()
                    },
                    end: {
                        year: I.getFullYear(),
                        month: I.getMonth()
                    },
                    institution: "",
                    course: "",
                    id: d.generateRandomString()
                }
            }
            var v = this,
                w = 0;
            v.years = h.years, v.months = h.months, v.candidate = n;
            var _ = !0;
            if (n.languages)
                for (n.languagesRates || (n.languagesRates = {}), w = 0; w < n.languages.length; w++) {
                    var T = n.languages[w];
                    n.languagesRates[T.id] ? n.languages[w].rate = n.languagesRates[T.id] : (n.languages[w].rate = 0, n.languagesRates[T.id] = 0)
                }
            if (v.ChangeToYear = function(e) {
                    return parseInt(v.getYearString(e))
                }, v.getYearString = function(e) {
                    if ("number" == typeof e && (e = e.toString()), "string" == typeof e && e.length > 4) try {
                        return new Date(e).getFullYear().toString()
                    } catch (e) {
                        return (new Date).getFullYear().toString()
                    }
                    return "object" == typeof e && e instanceof Date ? e.getFullYear().toString() : e
                }, v.fetchDate = function(e) {
                    var t = [],
                        n = [],
                        o = new Date;
                    e && ("string" == typeof e && (o = new Date(e), t.id = parseInt(o.getFullYear()), t.name = o.getFullYear().toString(), n.id = parseInt(o.getMonth()), n.name = v.months[o.getMonth()].name), "number" == typeof e && (o = new Date(e.toString()), t.id = e, t.name = o.getFullYear().toString(), n.id = null, n.name = null));
                    var a = [];
                    return a.year = t, a.month = n, a
                }, v.noticePeriods = [{
                    name: "1 month",
                    value: "0"
                }, {
                    name: "2 months",
                    value: "1"
                }, {
                    name: "3 months",
                    value: "2"
                }, {
                    name: "No Notice Period",
                    value: "3"
                }], v.candidate.education && "object" == typeof v.candidate.education)
                for (w = 0; w < v.candidate.education.length; w++) {
                    var C = v.candidate.education[w];
                    C.start = v.fetchDate(C.start), C.end = v.fetchDate(C.end)
                }