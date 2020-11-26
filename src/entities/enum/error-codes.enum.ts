export enum ErrorCodes {
    IdDoesNotExists = "MESSAGE.ID-DOES-NOT-EXIST",
    IdMissing = "MESSAGE.ID-MISSING-FROM-REQUEST",
    NameInvalidOrAlreadyInUse = "MESSAGE.NAME-INVALID-OR-ALREADY-IN-USE",
    IdInvalidOrAlreadyInUse = "MESSAGE.ID-INVALID-OR-ALREADY-IN-USE",
    InvalidApiKey = "MESSAGE.DEVICE-DOES-NOT-EXIST",
    InvalidPost = "MESSAGE.POST-FAILED",
    WrongLength = "MESSAGE.WRONG-LENGTH",
    NotValidFormat = "MESSAGE.NOT-VALID-FORMAT",
    BadEncoding = "MESSAGE.BAD-ENCODING",
    MissingOTAAInfo = "MESSAGE.OTAA-INFO-MISSING",
    MissingABPInfo = "MESSAGE.ABP-INFO-MISSING",
    UserAlreadyExists = "MESSAGE.USER-ALREADY-EXISTS",
    OrganizationAlreadyExists = "MESSAGE.ORGANIZATION-ALREADY-EXISTS",
    OrganizationDoesNotExists = "MESSAGE.ORGANIZATION-DOES-NOT-EXISTS",
    OrganizationDoesNotMatch = "MESSAGE.ORGANIZATION-DOES-NOT-MATCH",
    UserInactive = "MESSAGE.USER-INACTIVE",
    NotSameApplication = "MESSAGE.NOT-SAME-APPLICATION",
    PasswordNotMetRequirements = "MESSAGE.PASSWORD-DOES-NOT-MEET-REQUIREMENTS",
    SigFoxBadLogin = "MESSAGE.SIGFOX-BAD-LOGIN",
    GatewayIdNotAllowedInUpdate = "MESSAGE.GATEWAY-ID-NOT-ALLOWED-IN-UPDATE",
    GroupCanOnlyBeCreatedOncePrOrganization = "MESSAGE.GROUP-CAN-ONLY-BE-CREATED-ONCE-PR-ORGANIZATION",
    DeviceDoesNotExistInSigFoxForGroup = "MESSAGE.DEVICE-DOES-NOT-EXIST-IN-SIGFOX-FOR-GROUP",
    DownlinkNotSupportedForDeviceType = "MESSAGE.DOWNLINK-NOT-SUPPORTED-FOR-DEVICE-TYPE",
    DownlinkLengthWrongForSigfox = "MESSAGE.DOWNLINK-LENGTH-WRONG-FOR-SIGFOX",
    OnlyAllowedForLoRaWANAndSigfox = "MESSAGE.ONLY-ALLOWED-FOR-LORAWAN-AND-SIGFOX",
    DeviceIsNotActivatedInChirpstack = "MESSAGE.DEVICE-IS-NOT-ACTIVATED-IN-CHIRPSTACK",
    QueryMustNotBeEmpty = "MESSAGE.QUERY-MUST-NOT-BE-EMPTY",
    IsUsed = "MESSAGE.IS-USED",
    CannotModifyOnKombitUser = "MESSAGE.CANNOT-MODIFY-ON-KOMBIT-USER",
    SigfoxError = "MESSAGE.SIGFOX-ERROR",
    NoData = "NoData",
    MissingRole = "MissingRole",
    DeleteNotAllowedItemIsInUse = "MESSAGE.DELETE-NOT-ALLOWED-ITEM-IS-IN-USE",
}
