doctor_mappings = {
    "mappings": {
        "properties": {
            "address": {
                "type": "text",
                "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                }
            },
            "ailmentsTreated": {
                "type": "text",
                "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                }
            },
            "averageRating": {
                "type": "double"
            },
            "city": {
                "type": "text",
                "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                }
            },
            "country": {
                "type": "keyword"
            },
            "designation": {
                "type": "keyword"
            },
            "education": {
                "type": "nested",
                "properties": {
                        "degree": {
                            "type": "keyword"
                        },
                    "description": {
                            "type": "keyword"
                    },
                    "endDate": {
                            "type": "date"
                    },
                    "fieldOfStudy": {
                            "type": "keyword"
                    },
                    "grade": {
                            "type": "keyword"
                    },
                    "school": {
                            "type": "keyword"
                    },
                    "startDate": {
                            "type": "date"
                    }
                }
            },
            "email": {
                "type": "text",
                "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                }
            },
            "experience": {
                "type": "nested",
                "properties": {
                        "comapanyName": {
                            "type": "keyword"
                        },
                    "description": {
                            "type": "keyword"
                    },
                    "endDate": {
                            "type": "date"
                    },
                    "location": {
                            "type": "keyword"
                    },
                    "startDate": {
                            "type": "date"
                    },
                    "title": {
                            "type": "keyword"
                    }
                }
            },
            "firstName": {
                "type": "text",
                "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                }
            },
            "gender": {
                "type": "keyword"
            },
            "hospital": {
                "type": "nested",
                "properties": {
                        "identfier": {
                            "type": "keyword"
                        },
                    "name": {
                            "type": "keyword"
                    }
                }
            },
            "identifier": {
                "type": "keyword"
            },
            "isPersonAllowed": {
                "type": "boolean"
            },
            "isVideoAllowed": {
                "type": "boolean"
            },
            "landmark": {
                "type": "text",
                "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                }
            },
            "languages": {
                "type": "keyword"
            },
            "lastName": {
                "type": "text",
                "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                }
            },
            "licenses": {
                "type": "nested",
                "properties": {
                        "identifier": {
                            "type": "keyword"
                        },
                    "name": {
                            "type": "keyword"
                    },
                    "provider": {
                            "type": "keyword"
                    }
                }
            },
            "locality": {
                "type": "text",
                "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                }
            },
            "location": {
                "type": "geo_point"
            },
            "name": {
                "type": "text",
                "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                }
            },
            "phone": {
                "type": "keyword"
            },
            "schedule": {
                "properties": {
                    "day": {
                        "type": "keyword"
                    },
                    "slotTimeInMinutes": {
                        "type": "long"
                    },
                    "workingTime": {
                        "properties": {
                            "endTime": {
                                "type": "date",
                                "format": "basic_time_no_millis"
                            },
                            "startTime": {
                                "type": "date",
                                "format": "basic_time_no_millis"
                            }
                        }
                    }
                }
            },
            "specialization": {
                "type": "text",
                "fields": {
                        "keyword": {
                            "type": "keyword"
                        }
                }
            },
            "state": {
                "type": "keyword"
            },
            "yearsOfExperience": {
                "type": "long"
            }
        }
    }
}

schedule_mappings = {
    "mappings": {
        "properties": {
            "address": {
                "type": "keyword"
            },
            "appointmentAttended": {
                "type": "boolean"
            },
            "appointmentId": {
                "type": "keyword"
            },
            "appointmentNumber": {
                "type": "keyword"
            },
            "doctorComment": {
                "type": "keyword"
            },
            "doctorId": {
                "type": "keyword"
            },
            "hasSeenDoctorBefore": {
                "type": "boolean"
            },
            "location": {
                "type": "geo_point"
            },
            "patientComment": {
                "type": "keyword"
            },
            "patientId": {
                "type": "keyword"
            },
            "reasonForVisit": {
                "type": "keyword"
            },
            "status": {
                "type": "keyword"
            },
            "type": {
                "type": "keyword"
            }
        }
    }
}
