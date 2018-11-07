package com.capgemini.referentielcuid.exception;

import java.util.logging.Logger;

import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.CONFLICT)
public class ConflictException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ConflictException(String s) {	
		super(s);
		Logger logger = Logger.getLogger("logger");
		logger.info("----------- CONFLICT EXCEPTION -----------");
		logger.info(s);
	}
}
