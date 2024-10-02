@extends('layouts.admin')

@section('content')
    <div class="container">
        <h1>Crear Nuevo Item</h1>

        @if($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('items.store') }}" method="POST">
            @csrf
            <div class="form-group">
                <label for="name">Nombre</label>
                <input type="text" class="form-control" id="name" 
                name="name" value="{{ old('name') }}" required>
            </div>
            <div class="form-group">
                <label for="description">Descripcion</label>
                <input type="text" class="form-control" id="description" 
                name="description" value="{{ old('description') }}" required>
            </div>
            <div class="form-group">
                <label for="price">Precio</label>
                <input type="text" class="form-control" id="price" 
                name="price" value="{{ old('price') }}" required>
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
            <a href="{{ route('items.index') }}" class="btn btn-secondary">Cancelar</a>
        </form>
    </div>
@endsection