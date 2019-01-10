package com.capgemini.referentielcuid.exception;


import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.CONFLICT)
public class ConflictException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ConflictException(String s) {	
		super(s);
		Logger logger = LoggerFactory.getLogger(ConflictException.class);
		logger.error("----------- CONFLICT EXCEPTION -----------");
		logger.error(s);
	}
}
