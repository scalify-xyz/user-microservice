export type UseCase<InputDto, OutputDto> = {
    execute(input: InputDto): Promise<OutputDto>;
};
